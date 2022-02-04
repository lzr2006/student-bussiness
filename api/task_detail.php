<?php

use think\helper\Arr;

require_once("PHPMySQLiDatabaseClass/MysqliDb.php");
$db = new MysqliDb('127.0.0.1','root','root','student');
$cols = Array("title","content","price");
$db->where("title",$_GET["title"]);
echo $db->jsonBuilder()->get("task",null,$cols);
?>