<?php
include 'includes/functions.php';

$services = getServices();

echo (json_encode($services, JSON_UNESCAPED_UNICODE));
