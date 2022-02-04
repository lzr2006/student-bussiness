$(function()
{
    $("#post_quest").click(function()
    {
        var title   = $("#title").val()
        var content = $("#content").val()
        var user    = $.cookie("user")
        var price   = $("#price").val()
        //参数：具体需求内容 提交者 
        $.post("api/bussiness.php",
        {
            'title'        : title  ,
            'content'      : content,
            'price'        : price,
            'poster'       : user
        },function(data,status)
        {
            //console.log("状态："+status)
            console.log("返回数据")
            console.log(data)
            var json = JSON.parse(data)
            console.log(json)
            console.log(json.respone_msg)
            $("#myModal .modal-body").text(json.respone_msg)
        })
    })
})