$(function()
{
    if($.cookie("user")!=null)
    {
        $.get("api/user.php",
        {
            "account" : $.cookie("user")
        },function(data,status)
        {
            console.log(data)
            $("#content #nickname").text("昵称:"+data)
           // console.log(JSON.parse(data))
        })
    }
    else
    {
        $("#tip").trigger("click")
        $("#myModal #login").click(function()
        {
            window.open("login.html","_self")
        })
    }
    //编辑信息
    $("#edit_btn").click(function()
    {
        //todo 重构到单独的html里面去
        $("#profile_edit #content").empty()
        $.get("instance/user_basic.html",function(data,status)
        {
            $("#profile_edit #content").append(data)
            $("#back").on("click",function()
            {
                $("#profile_edit #content").empty()
                $.get("instance/user_content.html",function(data,status)
                {
                    console.log(data)
                    $("#profile_edit #content").append(data)
                })
            })
            $("#save").on("click",function()
            {
                var account  = $.cookie("user")
                var nickname = $("#nickname").val()
                var headimg  = $("#edit_head").val()
                var sex      = $('#sex_form input[name="sex"]:checked').val()
                var user_location = $("#location").val()
                var userinfo = $("#userinfo").val()
                var qq       = $("#qq").val()
                var wechat   = $("#wechat").val()
                $.post("api/update_user.php",
                {
                    "account"  : account,
                    "nickname" : nickname,
                    "headimg"  : headimg,
                    "location" : user_location,
                    "userinfo" : userinfo,
                    "qq"       : qq,
                    "sex"      : sex,
                    "wechat"   : wechat,
                },function(data,status)
                {
                    console.log(data)
                    if(data == "1")
                    {
                        localStorage.setItem("account",account)
                        localStorage.setItem("nickname",nickname)
                        localStorage.setItem("headimg",headimg)
                        localStorage.setItem("userinfo",userinfo)
                        localStorage.setItem("qq",qq)
                        localStorage.setItem("wechat",wechat)
                        alert("保存成功")
                        location.reload()
                    }
                    if(data == "2")
                    {
                        localStorage.setItem("account",account)
                        localStorage.setItem("nickname",nickname)
                        localStorage.setItem("headimg",headimg)
                        localStorage.setItem("userinfo",userinfo)
                        localStorage.setItem("qq",qq)
                        localStorage.setItem("wechat",wechat)
                        alert("更新成功")
                        location.reload()
                    }
                    else
                    {
                        alert("异常！"+data)
                    }
                })
            })
            //更换头像
            $("#edit_head").click(function()
            {
                //console.log("更换头像！")
                $("#file").trigger("click")
            })
            $("#file").on("change",function()
            {
                console.log(this)
                var file = event.target.files[0]
                console.log(file)
                var pettern = /^image/;                
                console.info(file.type)
                if (!pettern.test(file.type)) 
                {
                    alert("图片格式不正确");
                    return;
                }
                var fr = new FileReader()
                fr.readAsDataURL(file)
                fr.onload = function(e)
                {
                    console.log(e)
                    var result = this.result
                    console.log(result)
                    $("#edit_head").attr("src",result)
                }
            })
        })
    })
    
    $("#profile_root li").click(function()
    {
        var lit = $(this).text()
        $(this).css("border-left","4px solid #1890ff").siblings().css("border-left","0px")
        $(this).css("background-color","rgba(53, 51, 51, 0.244)").siblings().css("background-color","#FFFFFF")
        if(lit == "基本信息")
        {
            $("#profile_edit #content").empty()
            $("#profile_edit #title b").text("基本信息")
            $.get("instance/user_content.html",function(data,status)
            {
                $("#profile_edit #content").append(data)
            })
            
        }
        if(lit == "账号绑定")
        {
            $("#profile_edit #content").empty()
            $("#profile_edit #title b").text("账号绑定")
            $.get("instance/user_account_bind.html",function(data,status)
            {
                $("#profile_edit #content").append(data)
            })
        }

    })
    $("#id").click(function()
    {

    })
    $("#add_tag").click(function()
    {
        var t = $("#custom_tag").val()
        var dom = $("<button class='tag'></button>").text(t)
        //绑定点击事件
        dom.on("click",add_tag)
        $("#tag_area").append(dom)
    })
    //用户添加技能标签到自己的技能堆栈列表中
    var skills = []
    function add_tag()
    {
        var tag_name = $(this).text()
        //alert(tag_name)
        //避免添加重复的内容
        //alert(skills.indexOf(tag_name))
        if(skills.indexOf(tag_name)==-1)
        {
            skills.push(tag_name)
            $("#user_skill_tag").append("<li>" + tag_name + "</li>")
        }
        else
        {
            alert("错误！此技能标签已经添加")
        }
    }
    $(".tag").click(function()
    {
        var tag_name = $(this).text()
        //alert(tag_name)
        //避免添加重复的内容
        //alert(skills.indexOf(tag_name))
        if(skills.indexOf(tag_name)==-1)
        {
            skills.push(tag_name)
            $("#user_skill_tag").append("<li>" + tag_name + "</li>")
        }
        else
        {
            alert("错误！此技能标签已经添加")
        }
    })
    $("#clear_user_skill_tags").click(function()
    {
        skills = []
        $("#user_skill_tag").empty()
    })
})