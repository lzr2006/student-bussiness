<?php
// NOTE: 通用性链接到数据库的方法
function core_connect_to_db($servername,$username,$password,$db_name)
{
  $conn = new mysqli($servername,$username,$password);
  if ($conn->connect_error)
  {
    die("连接失败: " . $conn->connect_error);
  }
  else
  {
    //everydayonesentence
    mysqli_select_db($conn,$db_name);
    // NOTE: 默认设置编码utf-8防止乱码
    mysqli_query($conn,"SET NAMES utf8");
    return $conn;
  }
}?>