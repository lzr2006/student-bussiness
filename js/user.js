$(function()
{
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