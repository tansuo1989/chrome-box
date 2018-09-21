//下载知乎收藏夹的图片
// $start="https://www.zhihu.com/collection/62024183?page=1";




// var host=location.hostname;
// if(host!="www.zhihu.com"){return;}
// var colid="123354652";//收藏夹id
// if(location.path!="/collection/"+colid){return;}


var url="https://www.zhihu.com/collection/123354652";
if(location.href.search(url)==-1){return;}
var dirname="coll_1";

$(".toggle-expand").each(function(){
     $(this).get(0).click();
})

var allimg=[];
$(".zm-item-answer img").each(function(){
    allimg.push($(this).attr("src"))
})

var url="http://localhost/php/img.php";

console.log("loading...");

var data={imgs:allimg,dir:dirname};
$.post(url,data,function(d){
    console.log(d);
    var next= $(".zm-invite-pager span:last-child").find("a");
    console.log(next)
    if(next){
        next.get(0).click();
    }else{
        alert("完成了");
    }
})
