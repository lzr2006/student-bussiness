$(function()
{
    $("#refresh").click(function()
    {
        location.reload()
    })
    //改天研究下react jq太烦了
    $.get("api/get_checked_tasks.php",function(data,status)
    {
        if(data)
        {
            var json = JSON.parse(data)
            console.log(json)
            //console.log(typeof(model_data))
            for(var i=0;i<json.length;i++)
            {
                var content_wrapper = $("<div class='li'></div>")
                var content_img = $("<img/>")
                var content_a = $("<a href='task_detail.html' target='_blank'></a>")
                var content_span = $("<span class='proj_state'>项目状态</span>")
                var content_span_price = $("<span class='price'>价格</span>")
                
                $(content_img).attr("src","img/sand.png")
                $(content_img).attr("width","100px")
                $(content_img).attr("alt","项目图片预览")
                $(content_a).text(json[i].title)
                $(content_span_price).text("价格"+ json[i].price)
                
                $(content_wrapper).append(content_img)
                $(content_wrapper).append(content_a)
                $(content_wrapper).append(content_span)
                $(content_wrapper).append("<span>招标中</span>")
                $(content_wrapper).append(content_span_price)
                $(content_wrapper).append("<p>技能要求:Java</p>")

                $("#list").append(content_wrapper)
            }
        }
        else
        {
            alert("错误，未返回数据")
        }
    })
})