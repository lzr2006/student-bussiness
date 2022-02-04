$(function()
{
    $("#content li").hover(function()
    {
        $("audio")[0].play()
    },function(){})
    $("#profile_root li").click(function()
    {
        var lit = $(this).text()
        $(this).css("border-left","4px solid #1890ff").siblings().css("border-left","0px")
        $(this).css("background-color","rgba(53, 51, 51, 0.244)").siblings().css("background-color","#FFFFFF")
        console.log(lit)
        if(lit == "系统通知")
        {
            
        }
        /*
        if(lit == "基本信息")
        {
            $("#profile_edit #content").empty()
            location.reload()
        }
        if(lit == "账号绑定")
        {
            $("#profile_edit #content").empty()
            $("#profile_edit #title b").text("账号绑定")
            $.get("instance/user_account_bind.html",function(data,status)
            {
                $("#profile_edit #content").append(data)
            })
        }*/

    })
})