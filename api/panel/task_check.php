<?php
require_once("../PHPMySQLiDatabaseClass/MysqliDb.php");
$db = new MysqliDb('127.0.0.1','root','root','student');
$title   = $_POST['title'];
$content = $_POST['content'];
$user    = $_POST['user']; 
#是否通过
$check = $_POST['check_state'];
#审核码 1通过 -1不通过 0待审核
#var_dump($check);
if($check == "true")
{
   // echo "过审核逻辑执行>";
    $data = Array("allow"=>1);
    #筛选条件
    
    #$db->where("content",$content);
    //$db->where("price",$price);
    #假设用户名唯一 标题唯一不可重复，SELECT * FROM task WHERE user=$user AND allow=0
    $db->where("title",$title);
    $db->where("user",$user);
    $db->where("allow",0);

    if($db->update ('task', $data))
    {
        echo $db->count . ' records were updated';
    }   
    else
    {
        echo 'update failed: ' . $db->getLastError();
    }
}
else if($check == "false")
{
   // echo "不过审逻辑执行>";
    $data = Array("allow"=>-1);
    $db->where("title",$title);
    $db->where("user",$user);
    $db->where("allow",0);
    if($db->update ('task', $data))
    {
        echo $db->count . ' records were updated';
    } 
    else
    {
        echo 'update failed: ' . $db->getLastError();
    }
}
?>