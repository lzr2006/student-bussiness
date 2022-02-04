$(function()
{
    $("#refresh").click(function()
    {
        location.reload()
    })
    //todo 更新模板数据
    function update_model()
    {

    }
    //改天研究下react jq太烦了
    $.get("api/get_checked_tasks.php",function(data,status)
    {
        if(data)
        {
            var json = JSON.parse(data)
            console.log(json)
            var tmpl = $.templates("#myTmpl")
            //预处理json 按每10个元素分割->array_utils.js
            var jsonUtil = new JsonUtil()
            var tmp = jsonUtil.toArray(data)
            var result = jsonUtil.arraySplit(tmp,10)
            console.log("分割数组！")
            console.log(result)
            //第一页
            for(i in result[0])
            {
                var tmpl_data = 
                {
                    'title'    : json[i].title,
                    'price' : json[i].price,
                }
                var html = tmpl.render(tmpl_data)
                $("#list").append(html)
            }
        }
        else
        {
            alert("错误，未返回数据")
        }
    })
})