$(function()
{
    //高并发时使用不同邮箱处理发件机制 网易smtp + qq smtp + 其他邮箱smtp
    //限制用户每次获取验证码至少要间隔60秒
    var verify_reset = 60
    var timer
    function time_cal()
    {
        verify_reset -= 1
        $("#timer").text("再次获取倒计时:"+verify_reset)
        //console.log(verify_reset)
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
    $("#Mylogin").click(function()
    {
        var account = $("#account").val()
        var pwd = $("#pwd").val()
        if(account !="" && pwd!= "")
        {
            $.post("api/register.php",
            {
                'action' : 'login',
                'account': account,
                'pwd'    : pwd,   
            },function(data,status)
            {
                if(data)
                {
                    alert("登录成功,带你到主页")
                    //todo cookie缓存
                    window.open("index.html","_self")
                }
                else
                {
                    alert("错误，无数据返回！")
                }
                //console.log(data)
            })
        }
        else
        {
            alert("错误，缺少必要信息")
        }
    })
    $("#register").click(function()
    {
        var account = $("#account").val()
        var pwd = $("#pwd").val()
        var verify = $("#verify_input").val()
        if(account != "" && pwd != "" && verify!= "")
        {
            $.post("api/register.php",
            {
                'action'  : 'register',
                'account' : account,
                'pwd'     : pwd,
                'verify'  : verify,  
            },function(data,status)
            {
                //alert(data)
                if(data)
                {
                    console.log(data)
                    //console.log(typeof(data))
                    if(data == "1")
                    {
                        alert("注册成功,带你到主页")
                        //todo cookie缓存
                        console.log(data)
                        window.open("index.html","_self")
                    }
                    if(data == "0")
                    {
                        alert("错误！注册失败")
                    }
                }
                else
                {
                    alert("错误，无数据返回！")
                }
                //document.write(data)
            })
        }
        else
        {
            alert("错误，存在未输入的值！")
        }
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
                'action' : 'request_email_verify',
                'account': account,
            },function(data,status)
            {
                if(data)
                {
                    alert(data)
                }
                else
                {
                    alert("后台异常，未返回数据！")
                }
            })
        }
        else
        {
            alert("错误，邮箱为空！")
            //alert("错误，你需要至少等待"+verify_reset+"60秒重发验证码！")
        }
    })
})