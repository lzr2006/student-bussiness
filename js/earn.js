$(function()
{
    $("#refresh").click(function()
    {
        $("audio").attr("src","audio/se_old_extend.wav")
        $("audio")[0].play()
        alert("功能暂时移除，请手动刷新浏览器")
        //todo 等待音乐播放完毕再重新刷新
        //update_model(0)
        //location.reload()
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
    //改天研究下react
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
                return
            }
            $("#list p").hide()
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
            $("#list .li button").on("click",function()
            {
                //alert("点击！")
                var parent = $(this).parent()
                var title = parent.children("b.title")
                var text = title.text()
                $.cookie("danzi",text)
                console.log("单子："+text)
                window.open("task_detail.html")
            })
            
        }
        else
        {
            alert("错误，未返回数据")
        }
    })
})