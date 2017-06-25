<?php

$app->group('/taxi', function() {

	$this->get('/get_services', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM taxi_services";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});


	$this->get('/get_items', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM taxi_services INNER JOIN taxi_items ON taxi_items.taxi_service_id = taxi_services.id";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->get('/get_tickets', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM taxi_tickets INNER JOIN taxi_items ON taxi_items.id = taxi_tickets.taxi_item_id INNER JOIN users ON users.id = taxi_tickets.user_id";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->get('/add_service', function() { 

		require 'db.php'; //DB connection

		// Input
		$name = $_POST['name'];
		$image = $_POST['image'];
		$address = $_POST['address'];
		$country = $_POST['country'];
		$region = $_POST['region'];
		$country_code = $_POST['country_code'];

		$sql = "INSERT INTO taxi_tickets (name, image, address, country, region, country_code) VALUES ('$name', '$image', '$address', '$country', '$region', '$country_code')";
		if($conn->query($sql)) {
			print_r(json_encode(array("result" => "success")));
		} else {
			print_r(json_encode(array("result" => "failed")));
		}
	});

	$this->get('/add_item', function() { 

		require 'db.php'; //DB connection

		// Input
		$service_id = $_POST['service_id'];
		$price_per_km = $_POST['price_per_km'];

		$sql = "INSERT INTO taxi_items (service_id, price_per_km) VALUES ('$service_id', '$price_per_km')";
		if($conn->query($sql)) {
			print_r(json_encode(array("result" => "success")));
		} else {
			print_r(json_encode(array("result" => "failed")));
		}
	});

});

?>