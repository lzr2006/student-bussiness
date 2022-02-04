<?php

//这里引一个开源库Mysqli封装 版本2.9.3
#https://github.com/ThingEngineer/PHP-MySQLi-Database-Class

#use think\db\builder\Mysql;

use function PHPSTORM_META\type;

require_once("PHPMySQLiDatabaseClass/MysqliDb.php");

$title   = $_POST['title'];
$content = $_POST['content'];
$price   = $_POST['price'];
$poster = $_POST['poster'];

$db = new MysqliDb('127.0.0.1','root','root','student');
#状态码
$respone_body = Array
(
    'respone_code'  =>"",
    'respone_msg'   =>"",
    'respone_debug' =>"",
);
$data = Array('title'=>$title,"content"=>$content,"price"=>$price,"user"=>$poster,"allow"=>0);
#SELECT title from taks LIMT 1 WHERE title = $title
$db->where("title",$title);
$result = $db->getValue("task","title",1);
#var_dump($db->count);
#var_dump($result);
if($db->count == 1)
{
    $respone_body['respone_code'] = 403;
    $respone_body['respone_msg']  = "标题重复！请修改!"; 
    echo json_encode($respone_body);
}
else
{
    $id = $db->insert("task",$data);
    if($id)
    {
        $respone_body['respone_code'] = 200;
        $respone_body['respone_msg']  = "发布成功，等待管理员审核"; 
        echo json_encode($respone_body);
    }
    else
    {
        $respone_body['respone_code'] = 404;
        $respone_body['respone_msg']  = "发布失败404,如果此消息重复出现，请联系官方开发人员"; 
        $respone_body['debug'] = $db->getLastError();
        echo json_encode($respone_body);
    }
}
?>