$(function()
{
    //限制用户每次获取验证码至少要间隔60秒
    var verify_reset = 60
    var timer
    function time_cal()
    {
        verify_reset -= 1
        $("#timer").text("再次获取倒计时:"+verify_reset)
        console.log(verify_reset)
        if(verify_reset == 0)
        {
            console.log("清除计时器！")
            clearInterval(timer)
            //重置计时器
            verify_reset = 60
            $("#verify").attr("disabled",null)
            $("#timer").text("再次获取倒计时:"+verify_reset)
        }
    }
    $("#register").click(function()
    {
        var account = $("#account").val()
        var pwd = $("#pwd").val()
        var verify = $("#verify").val()
        console.log(account)
        console.log(pwd)
        console.log(verify)
    })
    $("#verify").click(function()
    {
        var account = $("#account").val()
        if(verify_reset == 60 && account != "")
        {
            timer = setInterval(time_cal,1000,verify_reset)
            $(this).attr("disabled","disabled")
            $.post("api/register.php",
            {
                'account':account,
            },function(data,status)
            {
                alert(data)
            })
        }
        else
        {
            alert("错误，邮箱为空！")
            //alert("错误，你需要至少等待"+verify_reset+"60秒重发验证码！")
        }
    })
})