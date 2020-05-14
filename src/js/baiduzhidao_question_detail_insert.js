

//添加提问者信息
!(function(){
    var page=window.F.context("page");
    var url="https://zhidao.baidu.com/usercenter?uid="+page.encodeUid;
    var date=fun.date_format(page.createTime);
    var xm=page.userName?page.userName:"匿名";
    var tags=page.tags;
    // console.log("tags",tags);
    if(page.userName){
       url=" href='"+url+"' target='_blank'";
    }else{
       url="";
    }
    var html="<span><a"+url+">@"+xm+": "+date+"</a>  <br/> <span>标签: "+tags+"</span></span>";
    html=fun.parseElement(html);
    document.querySelector("#v-times").parentNode.appendChild(html);
}())