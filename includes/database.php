<?php

/* $db = mysqli_connect("localhost", "root", "root", "appsalon"); */
$db = mysqli_connect("127.0.0.1", "root", "root", "appsalon");

if (!$db) {
	echo "Error during connection to database";
	exit;
}
