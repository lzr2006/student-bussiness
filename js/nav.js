$(function()
{
    $.get("instance/nav.html",function(data,status)
    {
        $(".nav").append(data)
    })
})