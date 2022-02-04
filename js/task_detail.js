$(function()
{
    $.get("api/task_detail.php",
    {
        "title" : $.cookie("danzi"),
    },function(data,status)
    {
        var json = JSON.parse(data)
        console.log(json)
        /*
        var tmpl_data = 
        {
            'title' : "测试",
            'price' : 100,
            "need"  : "路侧路边亭车系统开发或成品系统，价格可议,会玩stg游戏",
        }*/
        var tmpl = $.templates("#myTmpl")
        var html = tmpl.render(json)
        $("#panel").html(html)
    })
})