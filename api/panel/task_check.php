<?php
require_once("../PHPMySQLiDatabaseClass/MysqliDb.php");
$db = new MysqliDb('127.0.0.1','root','root','student');
$title = $_POST['title'];
$content = $_POST['content'];
#是否通过
$check = $_POST['check_state'];
#审核码 1通过 -1不通过 0待审核
#var_dump($check);
if($check == "true")
{
   // echo "过审核逻辑执行>";
    $data = Array("allow"=>1);
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