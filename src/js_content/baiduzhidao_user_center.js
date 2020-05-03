!(function(){
    function init(){
        var str=`<ul class='mynav'>
                    <li><a class='myfollow'>我的关注</a></li>
                    <li><a class='my-comment'>我的评论</a></li>
                    <li><a class="my-close">关闭</a></li>
                </ul>
                <div class="my-show-area"></div>
                `;
        $('body').append(str);
        $(".mynav li").css({
            "border-bottom":"1px solid #ddd",
        })
        $(".mynav a").css({
            cursor:"pointer",
            'padding':".5rem 0"
        })
        $(".my-close").css({
            cursor:"pointer",
            color:"red"
        })
        $(".mynav").css({
            boxSizing: "border-box",
            widhth:"10rem",
            background:"white",
            position:"fixed",
            left:0,
            top:0,
            zIndex:99999,
            padding:".5rem"
        })
        $('.my-show-area').css({
            width:"100%",
            height:"100vh",
            overflow:"auto",
            position:"fixed",
            background:"white",
            top:0,
            left:0,
            zIndex:9999,
            padding:"1rem 10rem",
            display:"none",
        })
        $('.myfollow').on("click",function(){
            $(".my-show-area").show();
            var html=show_follow_list();
            $(".my-show-area").html(html);
        })
        $(".my-close").click(()=>{
            $('.my-show-area').hide();
        })
        $(".my-comment").click(()=>{
            var html=get_comment_html();
            $(".my-show-area").html(html).show();
        })
    }
    init();


     function show_follow_list(){
        var old=local.get("baidu_know_follow_list",[]);
        var html="<div class='my-follow-list'>";
        if(old.length==0){
            html+="<p>暂无关注</p>";
        }else{
            html+="<h3>我的关注</h3>"
            old.forEach((v,i)=>{
                html+="<p style='margin:.5rem 0;'>"+(i+1)+". <a href='"+v.url+"' target='_blank' style='color:black;'>"+v.title+"</a> <span style='font-size:.8rem;color:#ddd;'>"+v.date+"</span></p>";
            })
        }
        html+="</div>";
        return html;
    }
    function get_max_time(arr){
        var max=0;
        arr.forEach(v=>{
            if(v.time>max){
                max=v.time
            }
        })
        return max;
    }
    function get_comment_list(){
        var list=local.get("baidu_comment_list",{});
        var arr=[];
        for(let i in list){
            let v=list[i];
            arr.push({
                time:get_max_time(v),
                data:v,
            })
        }
        arr.sort((a,b)=>{
            return b.time-a.time;
        })
        return arr;
    }
    function get_comment_html(){
        var list=get_comment_list();
        var html="<div class='my-follow-list'>";
        if(list.length==0){
            html+="<p>暂无评论</p>";
        }else{
            var i=0;
            html+="<h3>我的评论</h3>"
            list.forEach((v)=>{
                v.data.forEach((vv)=>{
                    i++;
                    html+="<p style='margin:.5rem 0;'>"+i+". <a href='"+"https://zhidao.baidu.com/question/"+vv.qid+"' target='_blank' style='color:black;'>"+vv.comment+"</a> <span style='font-size:.8rem;color:#ddd;'>"+fun.date_format(vv.time/1000)+"</span></p>";
                })
                
            })
        }
        html+="</div>";
        return html;
    }

   
  







    
}())
