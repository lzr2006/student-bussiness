<?php
require_once("PHPMySQLiDatabaseClass/MysqliDb.php");
$db = new MysqliDb('127.0.0.1','root','root','student');
$db->where("allow",1);
$json = $db->jsonBuilder()->get("task");
echo $json;
?>