<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>后台中心</title>
    <style>
        .block
        {
            border: solid 2px;
        }
        .title
        {
            display: inline;
        }
        </style>
        <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
        <!-- <script src="../../js/center.js"></script> -->
        <script>
            $(function()
            {
                $("#update").click(function()
                {
                    $.get("get_latest_task.php",function(data,status)
                    {
                        console.log("获取！"+data)
                        //document.write(data);
                        var li = "<li>"
                        var li_end = "</li>"
                        var json = JSON.parse(data)
                        console.log(json)
                        $("ol").append(li + data + li_end)
                        })
                    })
            })
</script>
</head>
<body>
    <h1 style="text-align: center;">后台中心</h1>
    <span>审核任务</span>
    <button id="update">获取下一行最新数据</button>
    <div class="block">
        <ol>
            <li>
                <h3 class="title">标题</h3>  <h4 class="title">提交者:创艺</h4>
                <div>内容</div>
                <button>审核通过</button>
                <button>审核不通过</button>
        </ol>
    </div>
</body>
</html>

