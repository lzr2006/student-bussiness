$(function()
{
    //alert("测试安装！")
    $("#post_quest").click(function()
    {
        var quest_detail = $("#quest_all_need").text()
        console.log(quest_detail)
        //参数：具体需求内容 提交者 
        $.post("api/bussiness.php",
        {
            quest_detail:quest_detail,
            poster:""
        },function(data,status)
        {
            if(status!=200)
            {
                alert("服务出错！")
            }
        })
    })
})