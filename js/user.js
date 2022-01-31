
$(function()
{
    //编辑信息
    $("#edit_btn").click(function()
    {
        //todo 重构到单独的html里面去
        $("#profile_edit #content").empty()
        $("#profile_edit #content").append('<input id="file" type="file" style="display:none">')
        $("#profile_edit #content").append("<label>昵称</label>")
        $("#profile_edit #content").append("<input type='text' placeholder='请输入昵称'/>")
        $("#profile_edit #content").append("<br/>")

        $("#profile_edit #content").append("<span>用户头像</span><img id='edit_head' src='img/sand.png' width='100px' />")
        $("#profile_edit #content").append("<br/>")

        $("#profile_edit #content").append("<label>性别</label>")
        $("#profile_edit #content").append("<form action='.php'> <input type='radio' name='sex'/>男<input type='radio'name='sex'/> 女</form>")
        $("#profile_edit #content").append("<br/>")

        $("#profile_edit #content").append("<span>所在地</span><input placeholder='请输入所在地'>")
        $("#profile_edit #content").append("<br/>")

        $("#profile_edit #content").append("<span>个人介绍</span><textarea placeholder='请输入你的个人介绍'></textarea>")
        $("#profile_edit #content").append("<br/>")

        $("#profile_edit #content").append("<span>qq</span><input placeholder='请输入你的qq'>")
        $("#profile_edit #content").append("<br/>")

        $("#profile_edit #content").append("<span>微信</span><input placeholder='请输入你的微信'>")

        $("#profile_edit #content").append("<br/>")
        $("#profile_edit #content").append("<button id='save'>保存</button>")
        $("#profile_edit #content").append("<button id='back'>返回</button>")
        $("#back").on("click",function()
        {
            //alert("返回！")
            $("#profile_edit #content").empty()
            $.get("instance/user_content.html",function(data,status)
            {
                console.log(data)
                $("#profile_edit").append(data)
            })
            
        })
        $("#save").on("click",function()
        {
            alert("信息已保存！")
        })
        $("#edit_head").click(function()
        {

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
            //var final = fr.readAsArrayBuffer(file)
            //console.log(final)
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
/*function get_file_path()
    {
        alert("#file").attr("value")
    }*/