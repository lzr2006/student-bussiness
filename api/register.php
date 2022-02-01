<?php
#开源库版本6.5.3
session_start();
use PHPMailer\PHPMailer\PHPMailer;
#use PHPMailer\PHPMailer\Exception;
#授权码 tigklvudaaysdjhg
require("PHPMailer/src/PHPMailer.php");
require("PHPMailer/src/SMTP.php");

$action = $_POST['action'];
$account = $_POST['account'];
$pwd = $_POST['pwd'];
$verify_code = $_POST['verify'];
if($action == "request_email_verify")
{
   $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
   $email= $account;//获取收件人邮箱
   $sendmail = '2439905184@qq.com'; //发件人邮箱
   $sendmailpswd = "tigklvudaaysdjhg"; //客户端授权密码,而不是邮箱的登录密码，就是手机发送短信之后弹出来的一长串的密码
   $send_name = '创艺';// 设置发件人信息，如邮件格式说明中的发件人，
   $toemail = $email;//定义收件人的邮箱
   $to_name = '用户';//设置收件人信息，如邮件格式说明中的收件人
   $mail->isSMTP();// 使用SMTP服务
   $mail->CharSet = "utf8";// 编码格式为utf8，不设置编码的话，中文会出现乱码
   $mail->Host = "smtp.qq.com";// 发送方的SMTP服务器地址
   $mail->SMTPAuth = true;// 是否使用身份验证
   $mail->Username = $sendmail;//// 发送方的
   $mail->Password = $sendmailpswd;//客户端授权密码,而不是邮箱的登录密码！
   $mail->SMTPSecure = "ssl";// 使用ssl协议方式
   $mail->Port = 465;//  qq端口465或587）
   $mail->setFrom($sendmail, $send_name);// 设置发件人信息，如邮件格式说明中的发件人，
   $mail->addAddress($toemail, $to_name);// 设置收件人信息，如邮件格式说明中的收件人，
   $mail->addReplyTo($sendmail, $send_name);// 设置回复人信息，指的是收件人收到邮件后，如果要回复，回复邮件将发送到的邮箱地址
   $mail->Subject = "学生技能知识付费-赚钱外包平台";// 邮件标题
   $code=rand(0000,9999);
   $_SESSION["code"] = $code;
   $mail->Body = "尊敬的用户，欢迎使用学生技能知识付费-赚钱外包平台，如果非本人操作无需理会！验证码5分钟内有效，以下代码是您的邮箱验证码，请将它写入网站注册窗口\n$code";
   if(!$mail->Send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
   } else {
    //将生成的验证码插入到后台临时数据表
    //echo true;
    echo "邮箱验证码一发送，请注意查收，验证码5分钟内有效";
 }
}
else if($action == "register")
{
   //echo $verify_code;
   //echo $_SESSION["code"];
  if($verify_code == $_SESSION['code'])
  {
     //注册！
     echo "邮箱验证成功！";
  }
  else
  {
     echo "错误，邮箱验证码不正确";
  }
}
else if($action == "login")
{
  
}
else
{
   echo "错误，不支持的参数！";
}

?>