<?php
#状态码
#1插入成功 2更新成功 0插入失败
require_once("PHPMySQLiDatabaseClass/MysqliDb.php");
$db = new MysqliDb('127.0.0.1','root','root','student');
$account  = $_POST['account'];
$nickname = $_POST['nickname'];
$headimg  = $_POST['headimg'];
$location = $_POST['location'];
$userinfo = $_POST['userinfo'];
$qq       = $_POST['qq'];
$sex      = $_POST['sex'];
$wechat   = $_POST['wechat'];
$userinfo = $_POST['userinfo'];
#var_dump($_POST);
$db->where("account",$account);
$pre_result = $db->get("userinfo");
$result_number = sizeof($pre_result);
#todo 把状态码和后端数据封装成json对象传回去
#字段
$data = Array(
    "account"=>$account,
    "nickname"=>$nickname,
    "sex"=>$sex,
    "location"=>$location,
    "user_info"=>$userinfo,
    );
#没有查找到数据，插入一行
if($result_number == 0)
{
    $id = $db->insert("userinfo",$data);
    if($id)
    {
        //echo "插入成功，更新了".$db->count."条数据";
        echo true;
    }
    else
    {
        //echo "插入失败".$db->getLastError();
        echo false;
    }
}
#有数据，不执行插入操作，只执行更新操作
if($result_number == 1)
{
    $db->where("account",$account);
    if($db->update("userinfo",$data))
    {
        //echo "更新了".$db->count."条数据";
        echo 2;
    }
    else
    {
        echo false;
        #echo "更新失败".$db->getLastError();
    }
}
?>