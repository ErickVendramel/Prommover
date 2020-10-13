<?php

define('DB_SERVER', 'mysql.inscreveu.com');
define('DB_USERNAME', 'inscreveu_add1');
define('DB_PASSWORD', 'sucessoem2020');
define('DB_NAME', 'inscreveu');
 
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

?>
