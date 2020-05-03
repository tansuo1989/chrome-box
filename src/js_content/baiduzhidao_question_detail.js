
var baidu_know={};
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



fun.insert_js(["/lib/fun.js",'/js/baiduzhidao_question_detail_insert.js']);

!(function(){
    //添加关注
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
            old.unshift(data);
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
   !(function(){
        var all_img=[];
        $('.q-img-li').each(function(){
            let item=$(this).data("src");
            all_img.push(item);
        })
        $.all_img=all_img;//绑定到$
    })()
    //左37,右39
    $("body").on("keydown",d=>{
        var now_img=$(".q-img-fullscreen-wraper img");
        // console.log(d.keyCode);
        if($.all_img.length>0&&now_img.length>0){
            if(d.keyCode==37||d.keyCode==39){
                var index=-1;
                $.all_img.forEach((v,i)=>{
                    console.log(v,now_img.attr("src"))
                    if(v==now_img.attr("src")){
                        index=i;
                    }
                })
                // console.log("index",index)
                if(d.keyCode==37&&index>0){
                    $(".q-img-fullscreen-wraper img").attr("src",$.all_img[index-1]);
                }else if(d.keyCode==39&&index<$.all_img.length-1){
                    $(".q-img-fullscreen-wraper img").attr("src",$.all_img[index+1]);
                }
            }
        }
    })

})()


//记录我的评论
// 问题页面：https://zhidao.baidu.com/question/qid
// console.log("comment_init",local.get("baidu_comment_list"));
$("span.comment").on("click",function(){
    var answer_id=$(this).attr("id").replace("comment-","");
    var qid=location.pathname.replace("/question/","").replace(".html","");
    var key=qid+"_"+answer_id;
    setTimeout(()=>{
        $(".comment-submit").on("click",function(){
            var comment=$('.mini-editor>textarea').val();
            if(!comment) return;
            var data={
                time:new Date().getTime(),
                comment,
                qid,
                aid:answer_id,
            }
            var list=local.get("baidu_comment_list",{});
            if(key in list && list[key].length>0){
                let len=list[key].length;
                let is_in=false;
                for(let i=0;i<len;i++){
                    if(list[key][i].comment==comment){
                        is_in=true;
                        break;
                    }
                }
                if(is_in==false){
                    list[key].push(data);
                }
            }else{
                list[key]=[data];
            }
            local.set("baidu_comment_list",list);
        })
        //删除
        $("span.delete").on("click",function(){
            var comment=$(this).parent().prev().html();
            setTimeout(()=>{
                $(".reply-delete-dialog .submit").on("click",function(){
                    var list=local.get("baidu_comment_list",{});
                    if(key in list && list[key].length>0){
                        let len=list[key].length;
                        for(let i=0;i<len;i++){
                            if(list[key][i].comment==comment){
                                list[key].splice(i,1);
                                local.set("baidu_comment_list",list);
                                break;
                            }
                        }
                    }
                })
            },300)
        })
    },1000)
})




