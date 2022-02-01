$(function() {
    $("#title span").click(function()
    {
        $(this).css("border-bottom", "2px solid #1890ff").siblings().css("border-bottom", "0px")
        var name = $(this).text()
        if (name == "资金总览")
        {
            $("#block #content").empty()
            $.get("instance/money_total.html", function(data, status) 
            {
                $("#block #content").append(data)
            })
        }
        if (name == "充值记录") 
        {
            $("#block #content").empty()
            $.get("instance/money.html", function(data, status) 
            {
                $("#block #content").append(data)
            })
        }
        if (name == "提现记录") 
        {
            $("#block #content").empty()
            $.get("instance/money.html", function(data, status) 
            {
                $("#block #content").append(data)
            })
        }
        if (name == "支出记录") 
        {
            $("#block #content").empty()
            $.get("instance/money.html", function(data, status) 
            {
                $("#block #content").append(data)
            })
        }
        if (name == "收入记录")
        {
            $("#block #content").empty()
            $.get("instance/money.html", function(data, status) 
            {
                $("#block #content").append(data)
            })
        }
    })
})