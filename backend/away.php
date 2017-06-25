<?php

$app->group('/away', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM away";
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
		$away_id = $args['id'];

		$sql = "SELECT * FROM away WHERE id = '$away_id'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->post('/add', function() { //Add leave

		require 'db.php'; //DB connection

		//Params
		$away_type 		= $_POST['away_type'];
		$specialist_id 	= $_POST['specialist_id'];
		$date_from 		= $_POST['date_from'];
		$date_to 		= $_POST['date_to'];

		$sql = "INSERT INTO away (away_type, specialist_id, date_from, date_to, created_at) VALUES ('$away_type', '$specialist_id', '$date_from', '$date_to', NOW())";

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

		$sql = "DELETE FROM away WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/modify', function() { //Modify leave

		require 'db.php'; //DB connection

		//Params
		$away_type 		= $_POST['away_type'];
		$specialist_id 	= $_POST['specialist_id'];
		$date_from 		= $_POST['date_from'];
		$date_to 		= $_POST['date_to'];

		$sql = "UPDATE away SET away_type = '$away_type', specialist_id = '$specialist_id', date_from = '$date_from', date_to = '$date_to', updated_at = NOW() WHERE id = '$id'";

		if($conn->query($sql)) {
			echo 1;
		} else {
			echo 0;
		}

	});

});


/***********/


$app->group('/away_type', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM away_type";
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
		$away_id = $args['id'];

		$sql = "SELECT * FROM away_type WHERE id = '$away_id'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->post('/add', function() { //Add leave

		require 'db.php'; //DB connection

		//Params
		$name 		= $_POST['name'];

		$sql = "INSERT INTO away_type (name, created_at) VALUES ('$name', NOW())";

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

		$sql = "DELETE FROM away_type WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/modify', function() { //Modify leave

		require 'db.php'; //DB connection

		//Params
		$name = $_POST['name'];

		$sql = "UPDATE away_type SET name = '$name', updated_at = NOW() WHERE id = '$id'";

		if($conn->query($sql)) {
			echo 1;
		} else {
			echo 0;
		}

	});

});

?>