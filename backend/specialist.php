<?php

$app->group('/specialists', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM v_specialists";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->get('/get/{id}', function($request, $response, $args) { //Get user by specified ID

		require 'db.php'; //DB connection

		//Arguments
		$speclialist_id = $args['id'];

		$sql = "SELECT * FROM specialists INNER JOIN users ON specialists.user_id = users.id WHERE specialists.user_id = '$speclialist_id'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->post('/add', function() { //Add user

		require 'db.php'; //DB connection

		//Params
		$user_id 	= $_POST['user_id'];
		$email 		= $_POST['email'];

		$sql = "INSERT INTO specialists (user_id, description) VALUES ('$user_id', '$email')";

		if($conn->query($sql)) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/remove', function() { //Remove user by specified ID

		require 'db.php'; //DB connection

		//Params
		$id = $_POST['id'];

		$sql = "DELETE FROM specialists WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

});

?>