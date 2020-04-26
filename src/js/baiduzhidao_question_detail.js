
var fun={
    two(num){
        return num<10?"0"+num:num;
    },
    date_format(time){
        var d=new Date(time*1000);
        return d.getFullYear()+"-"+this.two(d.getMonth()+1)+"-"+this.two(d.getDate());
    },
    parseElement(htmlString){
        return new DOMParser().parseFromString(htmlString,'text/html').body.childNodes[0]
    }
}


function add_question_info(){
    var page=window.F.context("page");
    var url="https://zhidao.baidu.com/usercenter?uid="+page.encodeUid;
    var date=fun.date_format(page.createTime);
    var xm=page.userName?page.userName:"no_name";
    var html="<a href='"+url+"' target='_blank'>@"+xm+": "+date+"</a>";
    html=fun.parseElement(html);
    document.querySelector("#v-times").parentNode.appendChild(html);
}
add_question_info();

