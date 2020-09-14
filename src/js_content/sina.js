

 var desc=$("p.desc").text();
 console.log("desc",desc)
 if(desc=="如需浏览，请长按网址复制后使用浏览器访问"){
     var link=$("p.link").text();
     $("p.link").after("<p style='text-align:center;'><a href='"+link+"'>自动跳转中...</a></p>");
     location.href=link;
 }