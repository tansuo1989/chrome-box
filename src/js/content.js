//网页内执行的代码

//获取代码并执行
chrome.extension.sendRequest({action:"getcode"},function(d){
    var code=JSON.parse(d.code);
    var config=JSON.parse(d.config);
    if(config.is_gesture==1){
        set_gesture();
    }
    if(config.is_code==1){
        var fn=new Function(code);
        fn();
    }
})

//刷新页面
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log("contentjs:",request);
        if(request.action=="reload"){
            location.reload();
        }
})

//鼠标手势
function set_gesture(){
    var bg = new BrowserGesture()
    bg.chrome_totop=()=>{
        $("body,html").animate({
            scrollTop:0
        },100)
    }
    bg.chrome_tobottom=()=>{
        $("body,html").animate({
            scrollTop:$("body").height(),
        },100)
    }
    bg.chrome_toback=()=>{
        history.back();
    }
    bg.chrome_close=()=>{
        // window.location.href="about:blank"; //有一定概率打开这个空白页面后并没有关闭
        // window.close(); 使用下面的方法，可以解决上述bug
        chrome.extension.sendRequest({action:"close"},d=>{
            console.log("close.back:",d);
        })
    }
}



///百度知道添加关注和“我的关注”的功能
var baidu_know={};

baidu_know.is_zhidao_question=function(){
    var r=/zhidao.baidu.com\/question\/\d+.html/;
    if(location.href.match(r)){
        return true;
    }
    return false;
}

baidu_know.is_zhidao_center=function (){
    if(location.href.match(/zhidao.baidu.com\/ihome\/homepage/)){
        return true;
    }
    return false;
}

baidu_know.add_follow_btn=function(f){
    var color=f==1?"white":"#eee";
    var text=f==1?'关注':'已关注';
    var style="border:1px solid #ddd;\
               padding:.3rem .5rem;\
               margin-left:.5rem;\
               background:'"+color+"';\
               ";
    var btn="<button style='"+style+"' class='follow_question'>"+text+"</button>";
    $("#v-times").before(btn);
}

baidu_know.is_follow=function(url,old){
     var len=old.length;
     for(var i=0;i<len;i++){
         if(old[i].url==url){
             return true;
         }
     }
     return false;
}

baidu_know.show_follow_list=function(){
    var old=local.get("baidu_know_follow_list",[]);
    var html="<div class='my-follow-list' style='padding-top:3rem;'>";
    if(old.length==0){
        html+="<p>暂无关注</p>";
    }else{
        old.forEach((v,i)=>{
            html+="<p style='margin:.5rem 0;'>"+(i+1)+". <a href='"+v.url+"' target='_blank' style='color:black;'>"+v.title+"</a> <span style='font-size:.8rem;color:#ddd;'>"+v.date+"</span></p>";
        })
    }
    html+="</div>";
    return html;
}

//问题详情页面
if(baidu_know.is_zhidao_question()){
    var d=new Date();
    var url=location.href;
    if(url.search(/\?/)!=-1){
        var url_arr=url.split("?");
        url=url_arr[0];
    }
    var data={
        url:url,
        title:document.title.replace("_百度知道",""),
        date:d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate(),
        time:d.getTime()/1000,
    }
    var old=local.get("baidu_know_follow_list",[]);
    var f=baidu_know.is_follow(data.url,old);
    f=f?0:1;
    baidu_know.add_follow_btn(f);
    $(".follow_question").click(function(){
        var text=$(this).text();
        if(text=="关注"){
            $(this).text("已关注");
            $(this).css({background:'#eee'});
            old.push(data);
        }else{
            $(this).text("关注");
            $(this).css({background:'white'});
            var len=old.length;
            for(var i=0;i<len;i++){
                if(old[i].url==data.url){
                    old.splice(i,1);
                    break;
                }
            }
        }
        local.set("baidu_know_follow_list",old);
    })
    //百度知道问题详情图片切换 
    function get_all_img(){
        var all_img=[];
        $('.q-img-li').each(function(){
            let item=$(this).data("src");
            all_img.push(item);
        })
        $.all_img=all_img;//绑定到$
    }
    get_all_img();
    //左37,右39
    $("body").on("keydown",d=>{
        var now_img=$(".q-img-fullscreen-wraper img");
        if($.all_img.length>0&&now_img.length>0){
            if(d.keyCode==37||d.keyCode==39){
                var index=-1;
                $.all_img.forEach((v,i)=>{
                    console.log(v,now_img.attr("src"))
                    if(v==now_img.attr("src")){
                        index=i;
                    }
                })
                console.log("index",index)
                if(d.keyCode==37&&index>0){
                    $(".q-img-fullscreen-wraper img").attr("src",$.all_img[index-1]);
                }else if(d.keyCode==39&&index<$.all_img.length-1){
                    $(".q-img-fullscreen-wraper img").attr("src",$.all_img[index+1]);
                }
            }
        }
    })
}

//用户中心
if(baidu_know.is_zhidao_center()){
    var str="<li><a style='cursor:pointer;' class='myfollow'>我的关注</a></li>";
    setTimeout(()=>{
        console.log($('.main-content-submenu').length);
        $('.main-content-submenu').eq(0).append(str);
        $('.myfollow').on("click",function(){
            $('.main-content-submenu').eq(0).find("a").removeClass("main-content-active");
            $(this).addClass("main-content-active");
            $("main").hide();
            var html=baidu_know.show_follow_list();
            $("main").before(html);
        })
    },1000)
}

 