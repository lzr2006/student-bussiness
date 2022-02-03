<?php
$account = $_GET["account"];
//echo $account;
require_once("PHPMySQLiDatabaseClass/MysqliDb.php");
$db = new MysqliDb('127.0.0.1','root','root','student');
#选择字段
$cols = Array("nickname","sex","location","user_info");
//$db->where("account",$account);
//$data = $db->get("user",null,$cols);
$json = $db->jsonBuilder()->get("userinfo",null,$cols);
echo $json;
#echo $db->getValue("user","username");
?>