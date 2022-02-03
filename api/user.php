<?php
$account = $_GET["account"];
//echo $account;
require_once("PHPMySQLiDatabaseClass/MysqliDb.php");
$db = new MysqliDb('127.0.0.1','root','root','student');
#选择字段
$cols = Array("username");
$db->where("account",$account);
//$data = $db->get("user",null,$cols);
$json = $db->jsonBuilder()->getValue("user","username");
echo $db->getValue("user","username");
?>