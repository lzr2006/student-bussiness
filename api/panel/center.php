<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
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
    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
    <script src="https://cdn.staticfile.org/popper.js/1.15.0/umd/popper.min.js"></script>
    <script src="https://cdn.staticfile.org/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <!-- <script src="../../js/center.js"></script> -->
        <script>
            $(function()
            {
                get_latest()
                function get_latest()
                {
                    $.get("get_latest_task.php",function(data,status)
                    {
                        console.log("获取！"+data)
                        var json = JSON.parse(data)
                        console.log(json)
                        if(json.length == 0)
                        {
                            $("ol").empty()
                            $("ol").append("<li>暂时没有用户提交新的任务</li>")
                            return
                        }
                        var li = $("<li></li>")
                        var title = "<h3 class='title'>任务标题:" + json[0].title + "</h3>"
                        var sub_title = " <h4 class='title'>提交者:" + json[0].user + "</h4>"
                        $(li).append(title)
                        $(li).append(sub_title)
                        $(li).append("<div>需求内容:"+ json[0].content + "</div>")
                        $(li).append("<button id='pass' type='button' class='btn btn-success'>审核通过</button>")
                        $(li).append("<button id='unpass' type='button' class='btn btn-dark'>审核不通过</button>")
                        $("ol").empty()
                        $("ol").append(li)
                        $("#pass").on("click",function()
                        {
                            $.post("task_check.php",
                            {
                                'title'       : json[0].title,
                                'content'     : json[0].content,
                                'price'       : json[0].price,
                                'user'        : json[0].user,
                                'check_state' : true
                            },function(data,status)
                            {
                                console.log(data)
                                //操作完成之后再次请求最新数据
                                get_latest()
                                $("audio").attr("src","../../audio/se_old_extend.wav")
                                $("audio")[0].play()
                            })
                        })
                        $("#unpass").on("click",function(data,status)
                        {
                            //console.log("不过审核按钮！")
                            $.post("task_check.php",
                            {
                                'title'       : json[0].title,
                                'content'     : json[0].content,
                                'user'        : json[0].user,
                                'check_state' : false
                            },function(data,status)
                            {
                                console.log(data)
                                //操作完成之后再次请求最新数据
                                get_latest()
                            })
                        })
                    })
                }
                $("#update").click(function()
                {
                    get_latest()
                    $("audio").attr("src","../../audio/se_gun00.wav")
                    $("audio")[0].play()
                })
                //重新审核
                $("#recheck").click(function()
                {
                    var state = confirm("你确定要重新审核所有任务吗？这将导致所有任务重置为状态0")
                    if(state)
                    {
                        //todo
                    }
                    else
                    {
                        //todo
                    }
                })
            })
    </script>
</head>
<body>
<audio src="../../audio/se_old_extend.wav"></audio>
<div class="container-fluid">
    <h1 style="text-align: center;">后台中心</h1>
    <span>审核任务</span>
    <button id="update" class="btn btn-primary">获取下一行最新数据</button>
    <button id="recheck" class="btn btn-danger">重新审核全部任务</button>
    <div class="block">
        <ol>
            <!-- 模板 -->
            <!-- <li>
                <h3 class="title">标题</h3>  <h4 class="title">提交者:创艺</h4>
                <div>内容</div>
                <button type="button" class="btn btn-success">审核通过</button>
                <button type="button" class="btn btn-dark">审核不通过</button>
            </li> -->
        </ol>
    </div>
</div>
</body>
</html>

