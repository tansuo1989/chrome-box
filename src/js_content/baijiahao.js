setTimeout(()=>{
$(".title-link").each(function(){
    var link=$(this).attr("href");
    if(link.match(/builder\/preview/)){
        var arr=link.split("?");
        var id=arr[1];
        $(this).after("<a target='_blank' style='border:1px solid #ddd;padding:0 .3rem;margin-left:.5rem;' href='https://baijiahao.baidu.com/s?"+id+"'>查看</a>");
    }
})


},3000)