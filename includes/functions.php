<?php

function getServices()
{
	try {
		require("database.php");

		$sql = "SELECT * FROM servicios;";

		$query = mysqli_query($db, $sql);

		/* Different ways to get results */
		/* var_dump(mysqli_fetch_array($query)); */
		/* var_dump(mysqli_fetch_all($query)); */
		/* var_dump(mysqli_fetch_assoc($query)); */

		$services = [];
		$i = 0;

		while ($row = mysqli_fetch_assoc($query)) {
			$services[$i]["id"] = $row["id"];
			$services[$i]["nombre"] = $row["nombre"];
			$services[$i]["precio"] = $row["precio"];

			$i++;
		}

		return $services;
	} catch (Throwable $e) {
		var_dump($e);
	}
}


getServices();
