<?php
            require_once("../PHPMySQLiDatabaseClass/MysqliDb.php");
            $db = new MysqliDb('127.0.0.1','root','root','student');
            #获得行数
            $count = $db->getValue("task","count(*)");
            //echo "行数".$count."<br/>";
            #只获取未审核的任务
            $db->where("allow",0);
            $json = $db->jsonBuilder()->getOne("task");
            #rawQueryOne("SELECT * from task WHERE allow=0");
            echo $json;
            /*echo "任务标题:" . $raw['title'];
            echo "描述内容:" .  $raw['content'];
            echo "用户:" . $raw['user'];*/
?>