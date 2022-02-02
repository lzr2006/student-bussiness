<?php

//这里引一个开源库Mysqli封装 版本2.9.3
#https://github.com/ThingEngineer/PHP-MySQLi-Database-Class

#use think\db\builder\Mysql;

require_once("PHPMySQLiDatabaseClass/MysqliDb.php");

$title   = $_POST['title'];
$content = $_POST['content'];
$price   = $_POST['price'];
$poster = $_POST['poster'];

$db = new MysqliDb('127.0.0.1','root','root','student');
/*echo "title".$title."<br/>";
echo "content".$content."<br/>";
echo "price".$price."<br/>";
echo "user".$poster."<br/>";*/
$data = Array('title'=>$title,"content"=>$content,"price"=>$price,"user"=>$poster,"allow"=>0);
$id = $db->insert("task",$data);
if($id)
{
    echo "任务发布成功";
}
else
{
    echo "<br/>任务发布失败，如果此消息重复出现，请联系官方开发人员";
}
/*var $_POST[''];
$pdo = new PDO();
$pdo->;
echo ""；*/
?>