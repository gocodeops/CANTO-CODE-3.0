<?php

/*
* If active appointment dates have been exceeded
* Set status to inactive because the appointment has been fullfilled
*/
function verify_active_status() {
	require 'db.php'; //DB connection

	$sql = "UPDATE appointments SET status = 'inactive' WHERE `date` < CURDATE()";
	$conn->query($sql); // Execute query
}


$app->group('/appointments', function() { // Appointment group route

	$this->get('/get', function() { // Get all appointments
		
		verify_active_status(); // De-active active appointment if date has been exceeded

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM appointments";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);
	});

	$this->get('/get/{id}', function($request, $respone, $args) { // Get appointment by ID

		verify_active_status(); // De-active active appointment if date has been exceeded

		require 'db.php'; //DB connection

		//Arguments
		$id = $args['id'];

		$sql = "SELECT * FROM appointments WHERE id = '$id'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);
	});

	$this->get('/get/{user_type}/{user_id}', function($request, $respone, $args) { // Get appointment by patient/specialist ID

		verify_active_status(); // De-active active appointment if date has been exceeded

		require 'db.php'; //DB connection

		//Arguments
		$id = $args['user_id'];
		$user_type = $args['user_type']; # patient or specialist

		switch ($user_type) {
			case 'patient':
				$sql = "SELECT appointments.*, users.firstname, users.lastname FROM appointments INNER JOIN specialists ON appointments.specialist_id = specialists.id INNER JOIN users ON users.id = specialists.user_id WHERE appointments.patient_id = '$id' AND state != 'waiting' ORDER BY created_at DESC";
				break;

			case 'specialist':
				$sql = "SELECT appointments.*, users.firstname, users.lastname FROM appointments INNER JOIN specialists ON appointments.specialist_id = specialists.id INNER JOIN users ON users.id = specialists.user_id WHERE appointments.specialist_id = '$id' AND state != 'waiting' ORDER BY created_at DESC";
				break;
			
			default:
				# Do nothing
				break;
		}

		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);
	});

	$this->post('/pending', function($request, $respone, $args) { // Get pending appointments by patient/specialist ID

		verify_active_status(); // De-active active appointment if date has been exceeded

		require 'db.php'; //DB connection

		//Arguments
		$id = $_POST['id'];
		$user_type = $_POST['user_type']; # patient or specialist

		switch ($user_type) {
			case 'patient':
				$sql = "SELECT appointments.*, users.firstname, users.lastname FROM appointments INNER JOIN specialists ON appointments.specialist_id = specialists.id INNER JOIN users ON users.id = specialists.user_id WHERE appointments.patient_id = '$id' AND appointments.request_state = 'patient' AND state = 'waiting'";
				break;

			case 'specialist':
				$sql = "SELECT appointments.*, users.firstname, users.lastname FROM appointments INNER JOIN specialists ON appointments.specialist_id = specialists.id INNER JOIN users ON users.id = specialists.user_id WHERE appointments.patient_id = '$id' AND appointments.request_state = 'specialist' AND state = 'waiting'";
				break;
			
			default:
				# Do nothing
				break;
		}

		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);
	});

	/*
	* Add appointment
	* Appointment is always created by the mobile - user
	*/
	$this->post('/add', function() {

		verify_active_status(); // De-active active appointment if date has been exceeded

		require 'db.php'; //DB connection

		//Params
		$specialist_id 	= $_POST['specialist_id'];
		$patient_id 	= $_POST['patient_id'];
		$date 			= $_POST['date'];
		$period 		= $_POST['period']; # AM or PM

		$sql = "INSERT INTO appointments (patient_id, specialist_id, `date`, period, request_state, state, status) VALUES ('$patient_id', '$specialist_id', '$date', '$period', 'specialist', 'waiting', 'active')";

		if($conn->query($sql)) {
			print_r(json_encode(array("result" => "success")));
		} else {
			print_r(json_encode(array("result" => "failed")));
		}

	});

	$this->get('/cancelled', function() { // Overview of cancelled appointments

		verify_active_status(); // De-active active appointment if date has been exceeded
		
		require 'db.php'; //DB connection

		$sql = "SELECT * FROM appointments WHERE state = 'cancelled'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);
	});

	$this->get('/waiting/{id}', function($request, $response, $args) { // Number of waiting appointments

		verify_active_status(); // De-active active appointment if date has been exceeded
		
		require 'db.php'; //DB connection

		$id = $args['id'];

		$sql = "SELECT count(id) AS count FROM appointments WHERE state = 'waiting' AND patient_id = '$id'";
		$query = $conn->query($sql);
		$count = $query->fetch_assoc()['count'];
		
		$array = array("count" => $count);

		//JSON encode
		$array = json_encode($array);
		print_r($array);
	});

	/**
	* Give response to an appointment
	* Either a patient or a specialist	
	* @param -> patient || specialist
	* @param cancelled 1 || 0
	* @param fully_booked -> 1 || 0 : The specialist can indicate if appointments are fully booked
	* @return 1 -> true || 0 -> false
	*/
	$this->post('/respond', function() {

		verify_active_status(); // De-active active appointment if date has been exceeded

		require 'db.php'; //DB connection

		//Params
		@$id 			= $_POST['id'];
		@$time 			= $_POST['time'];
		@$date 			= $_POST['date'];
		@$period 		= $_POST['period'];			# AM or PM
		@$isCancelled	= $_POST['cancelled']; 		// 1 -> true || 0 -> false => Set state to Cancelled if value is 0
		@$fully_booked	= $_POST['fully_booked']; 	// 1 -> true || 0 -> false. 0 is default value
		@$user_type 	= $_POST['user_type']; 		# patient || specialist

		if($isCancelled == 1) { // If isCancelled is 1 (true)
			$sql = "UPDATE appointments SET state = 'cancelled', status = 'inactive', request_state = 'patient', fully_booked = '$fully_booked', updated_at = NOW() WHERE id = '$id'";
		} else {
			switch ($user_type) {
				case 'patient':
					# If the patient accepts the appointment after the specialist responded
					# The appointment is as state accepted
					$sql = "UPDATE appointments SET state = 'accepted', updated_at = NOW() WHERE id = '$id'";
					break;

				case 'specialist':
					$sql = "UPDATE appointments SET `time` = '$time', `date` = '$date', period = '$period', fully_booked = '$fully_booked', request_state = 'patient', updated_at = NOW() WHERE id = '$id'";
					break;
				
				default:
					# Do nothing
					break;
			}
		}

		if($conn->query($sql)) {
			print_r(json_encode(array("result" => "success", "cancelled" => $isCancelled)));
		} else {
			print_r(json_encode(array("result" => "failed")));
		}

	});

});
	
?>
