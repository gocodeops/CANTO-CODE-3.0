<?php

$app->get('/login', function(){
	print_r(json_encode(array("result" => "failed")));
});

$app->post('/login', function() {

	require 'db.php'; //DB connection

	//Params
	$email 	= $_POST['username'];
	$password 	= sha1($_POST['password']);

	$sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
	$query = $conn->query($sql);

	echo $email;
	echo $password;
	
	// if($query->num_rows == 1) {
	// 	// $array = array(); //Create array

	// 	// while ($result = $query->fetch_assoc()) {
	// 	// 	$array[] = $result;
	// 	// }

	// 	// //JSON encode
	// 	// $array = json_encode($array);
	// 	// print_r($array);

	// 	print_r(json_encode(array("result" => "success")));

	// } else {
	// 	print_r(json_encode(array("result" => "failed")));
	// }

});

$app->post('/register', function() {

	require 'db.php'; //DB connection

	//Params
	$email 	= $_POST['email'];
	$password 	= sha1($_POST['password']);

	$sql = "INSERT INTO users (email, password) VALUES ('$email', '$password')";
	if($conn->query($sql)) {
		print_r(json_encode(array("result" => "success")));
	} else {
		print_r(json_encode(array("result" => "failed")));
	}

});

$app->post('/checker', function() { //login for cms users

	echo $_POST['password'];
});

$app->group('/users', function() {});

?>