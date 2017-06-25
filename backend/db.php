<?php

	$servername = 'localhost';
	$username 	= 'tes729sr_healthy';
	$password 	= 'tes729sr_healthy_do';
	$db			= 'tes729sr_canto';

	$conn = @new mysqli($servername, $username, $password, $db);

	if($conn->connect_error) {
		echo "Error:" . $conn->connect_error;
	}

?>