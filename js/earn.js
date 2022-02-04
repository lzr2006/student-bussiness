$(function()
{
    $("#refresh").click(function()
    {
        location.reload()
    })
    //todo 更新模板数据 
    /**
     * 
     * @param {number} index 切换页码
     * @param {Array} result_data 分割后的数组
     */
    function update_model(index,result_data)
    {
        $("#list").empty()
        console.log("数据个数: " +result_data[index-1].length)
        var page_index = index-1
        //console.log(result_data[index-1][0].title)
        for(i in result_data[page_index])
        {
            var tmpl_data = 
            {
                'title'    : result_data[page_index][i].title,
                'price' : result_data[page_index][i].price,
            }
            //console.log(result_data[index-1])
            var tmpl = $.templates("#myTmpl")
            var html = tmpl.render(tmpl_data)
            $("#list").append(html)
        }
    }
    //改天研究下react jq太烦了
    $.get("api/get_checked_tasks.php",function(data,status)
    {
        if(data)
        {
            var show_index = 1
            var json = JSON.parse(data)
            console.log("后台返回的原始数据")
            console.log(json)
            if(json.length == 0)
            {
                $("#page").hide()
            }
            var tmpl = $.templates("#myTmpl")
            //预处理json 按每10个元素分割->array_utils.js
            var jsonUtil = new JsonUtil()
            var tmp = jsonUtil.toArray(data)
            var splited_data = jsonUtil.arraySplit(tmp,10)
            console.log("分割数组！")
            console.log(splited_data)
            //设置分页
            for(i in splited_data)
            {
                var li = $("<li class='page-item'></li>")
                var a  = $("<a class='page-link' href='#'></a>")
                $(li).attr("id",show_index.toString())
                $(a).text(show_index)
                var r  = $(li).append(a)
                $("#"+i).after(r)
                show_index += 1
            }
            //点击底部按钮时
            $("#page li a").on("click",function()
            {
                var t = $(this).text()
                var page_index = parseInt(t)
                if(page_index >0)
                {
                    console.log("切换到页码>"+page_index)
                    update_model(page_index,splited_data)
                }
            })
            //第一页
            for(i in splited_data[0])
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