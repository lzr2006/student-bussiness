$(function()
{
    //document.write(Pager({totalCount:150}))
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
            var show_index = 1
            var json = JSON.parse(data)
            console.log(json)
            if(json.length == 0)
            {
                $("#page").hide()
            }
            var tmpl = $.templates("#myTmpl")
            //预处理json 按每10个元素分割->array_utils.js
            var jsonUtil = new JsonUtil()
            var tmp = jsonUtil.toArray(data)
            var result = jsonUtil.arraySplit(tmp,10)
            console.log("分割数组！")
            console.log(result)
            //设置分页
            for(i in result)
            {
                console.log(show_index)
                console.log(typeof(show_index))
                var li = $("<li class='page-item'></li>")
                var a  = $("<a class='page-link' href='#'></a>")
                $(li).attr("id",show_index.toString())
                $(a).text(show_index)
                var r  = $(li).append(a)
                $("#"+i).after(r)
                show_index += 1
            }
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