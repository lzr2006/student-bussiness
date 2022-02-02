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
            poster:"测试用户666"
        },function(data,status)
        {
            alert(data)
            if(data == "任务发布成功")
            {
                window.open("earnMoney.html","_self")
            }
        })
    })
})