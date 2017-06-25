<?php

$app->group('/restaurant', function() {

	$this->get('/get_services', function() {

		require 'db.php'; //DB connection

		$sql = "SELECT * FROM restaurant_services";
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

		$sql = "SELECT * FROM restaurant_services INNER JOIN restaurant_items ON restaurant_items.restaurant_service_id = restaurant_services.id";
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

		$sql = "SELECT * FROM restaurant_tickets INNER JOIN restaurant_items ON restaurant_items.id = restaurant_tickets.restaurant_item_id INNER JOIN users ON users.id = restaurant_tickets.user_id";
		$query = $conn->query($sql);
		$array = array(); //Create array

		while ($result = $query->fetch_assoc()) {
			$array[] = $result;
		}

		//JSON encode
		$array = json_encode($array);
		print_r($array);

	});

	$this->post('/add_service', function() { 

		require 'db.php'; //DB connection

		// Input
		$name = $_POST['name'];
		$image = $_POST['image'];
		$address = $_POST['address'];
		$country = $_POST['country'];
		$region = $_POST['region'];
		$country_code = $_POST['country_code'];

		$sql = "INSERT INTO restaurant_services (name, image, address, country, region, country_code) VALUES ('$name', '$image', '$address', '$country', '$region', '$country_code')";
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
		$item_image = $_POST['item_image'];
		$item_name = $_POST['item_name'];
		$price = $_POST['price'];

		$sql = "INSERT INTO restaurant_items (service_id, item_image, item_name, price) VALUES ('$service_id', '$item_image', '$item_name', '$price')";
		if($conn->query($sql)) {
			print_r(json_encode(array("result" => "success")));
		} else {
			print_r(json_encode(array("result" => "failed")));
		}
	});

});

?>