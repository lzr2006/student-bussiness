$(function()
{
    //将数据用json格式存在localStorage data=[]
    /**
     * 
     * @param {Array<string>} data 字符串数组
     */
    function cache(data)
    {
        console.log("执行缓存数据")
        console.log(data)
        var json = JSON.stringify
        ({
            "昵称" : data[0],
            "性别" : data[1],
            "头像"  : data[2],
            "个人介绍" : data[3],
            "qq"       : data[4],
            "微信"   : data[5],
        })
        localStorage.setItem("student_user_json",json)
    }
    /**
     * 
     * @param {string} data json对象字符串
     */
    function cache_json(data)
    {
        console.log("执行缓存数据")
        console.log(data)
        localStorage.setItem("student_user_json",data)
    }
    //检测是否存在缓存
    if($.cookie("user")!=null)
    {
        var account = $.cookie("user")
        $.get("instance/user_content.html",function(data,status)
        {
            $("#content").empty()
            $("#content").append(data)
            //检测缓存
            if(localStorage.getItem("student_user_json") != null)
            {
                console.log("存在缓存")
                console.log(localStorage.getItem("student_user_json"))
                var json = JSON.parse(localStorage.getItem("student_user_json"))
                //console.log(json)
                var children = $("#content p")
                // console.log(children)
                var index = 0
                for(item in json)
                {
                    $(children[index]).text(item +":" + json[item])
                    index += 1
                }
             }
            else
            {
                console.log("不存在缓存")
                $.get("api/user.php",
                {
                    "account" : account
                },function(data,status)
                {
                    console.log(data)
                    if(data == 0)
                    {
                        $("#myModal .modal-header").text("暂无数据")
                        $("#myModal .modal-body").text("暂无数据，请手动编辑")
                        $("#tip").trigger("click")
                    }
                    else
                    {
                        cache(data)
                        console.log(JSON.parse(data))
                    }
                })
            }
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
        $("#profile_edit #content").empty()
        $.get("instance/user_basic.html",function(data,status)
        {
            $("#profile_edit #content").append(data)
            $("#back").on("click",function()
            {
                location.reload()
            })
            $("#save").on("click",function()
            {
                var data_array = []
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
                    if(data == "1")
                    {
                        data_array.push(nickname,headimg,sex,userinfo,qq,wechat)
                        //console.log(data_array)
                        cache(data_array)
                        alert("保存成功")
                        location.reload()
                    }
                    if(data == "2")
                    {
                        data_array.push(nickname,headimg,sex,userinfo,qq,wechat)
                        //console.log(data_array)
                        cache(data_array)
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
        //bug 更换界面时应该根据是否存在缓存而进行更新
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
        //避免添加重复的内容
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
        //避免添加重复的内容
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