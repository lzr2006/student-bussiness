$(function()
{
    //alert("测试安装！")
    $("#post_quest").click(function()
    {
        var title   = $("#title").val()
        var content = $("#content").val()
        var user    = "测试用户666"
        var price   = $("#price").val()
        console.log("title:"+title)
        console.log("content:"+content)
        console.log("user:"+user)
        console.log("price:"+price)
        //参数：具体需求内容 提交者 
        $.post("api/bussiness.php",
        {
            'title'        : title  ,
            'content'      : content,
            'price'        : price,
            'poster'       : user
        },function(data,status)
        {
            console.log("状态："+status)
            console.log("返回数据")
            console.log(data)
            if(data == "任务发布成功")
            {
                $("#myModal .modal-body").text("任务发布成功！")
               // window.open("earnMoney.html","_self")
            }
            else
            {
                $("#myModal .modal-body").text("任务发布失败")
            }
        })
    })
})