<?php

$app->group('/faq', function() {

	$this->get('/get', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM faq";
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
		$faq_id = $args['id'];

		$sql = "SELECT * FROM faq WHERE id = '$faq_id'";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->post('/add', function() { //Add faq

		require 'db.php'; //DB connection

		//Params
		$user_id 	= $_POST['user_id'];
		$question 	= $_POST['question'];
		$answer 	= $_POST['answer'];

		$sql = "INSERT INTO faq (created_by, question, answer, created_at) VALUES ('$user_id', '$question', '$answer', NOW())";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/remove', function() { //Remove faq by specified ID

		require 'db.php'; //DB connection

		//Params
		$id = $_POST['id'];

		$sql = "DELETE FROM faq WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query) {
			echo 1;
		} else {
			echo 0;
		}

	});

	$this->post('/modify', function() { //Modify faq

		require 'db.php'; //DB connection

		//Params
		$user_id 	= $_POST['user_id'];
		$question 	= $_POST['question'];
		$answer 	= $_POST['answer'];

		$sql = "UPDATE faq SET updated_by = '$user_id', question = '$question', answer = '$answer', updated_at = NOW() WHERE id = '$id'";
		$query = $conn->query($sql);

		if($query_type) {
			echo 1;
		} else {
			echo 0;
		}

	});

});

?>