<?php
$account = $_GET["account"];
require_once("PHPMySQLiDatabaseClass/MysqliDb.php");
$db = new MysqliDb('127.0.0.1','root','root','student');
#选择字段
$account_col = Array('account');
$cols = Array("nickname","sex","location","user_info");
//$db->where("account",$account);
//$data = $db->get("user",null,$cols);
$data = $db->get("userinfo",null,$account_col);
//echo $db->count;
//var_dump($db->count);
if($db->count == 0)
{
    echo false;
}
else
{
    $json = $db->jsonBuilder()->get("userinfo",null,$cols);
    echo $json;
}
?>