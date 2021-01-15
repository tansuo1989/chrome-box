

 if($("p.desc").text()=="如需浏览，请长按网址复制后使用浏览器访问"){
     var link=$("p.link").text();
 }
 else if($(".open-url a").text()=='继续访问'){
     var link=$(".open-url a").attr("href");
 }
 if(link){
    location.href=link;
 }