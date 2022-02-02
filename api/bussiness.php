<?php

//这里引一个开源库Mysqli封装 版本2.9.3
#https://github.com/ThingEngineer/PHP-MySQLi-Database-Class

#use think\db\builder\Mysql;

require_once("api/MysqliDb.php");#MysqliDb.php");
//任务需求内容
$content = $_POST['quest_detail'];
//任务发布者
$poster = $_POST['poster'];
$db = new MysqliDb('127.0.0.1','root','root','task');

/*var $_POST[''];
$pdo = new PDO();
$pdo->;
echo ""；*/
?>