<?php

//这里引一个开源库Mysqli封装 版本2.9.3
#https://github.com/ThingEngineer/PHP-MySQLi-Database-Class

#use think\db\builder\Mysql;

require_once("PHPMySQLiDatabaseClass/MysqliDb.php");#MysqliDb.php");
//任务需求内容
$content = $_POST['quest_detail'];
//任务发布者
$poster = $_POST['poster'];
$db = new MysqliDb('127.0.0.1','root','root','student');
$data = Array('title'=>"测试标题","content"=>"测试内容","price"=>20.0,"allow"=>0);
$id = $db->insert("task",$data);
if($id)
{
    echo "任务发布成功";
}
else
{
    echo "任务发布失败，如果此消息重复出现，请联系官方开发人员";
}
/*var $_POST[''];
$pdo = new PDO();
$pdo->;
echo ""；*/
?>