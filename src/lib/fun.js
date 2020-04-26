
var local={
    get(key,def){
        var re=localStorage.getItem(key);
        return re?JSON.parse(re):(def?def:false);
    },
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    }
}

var fun={
    two(num){
        return num<10?"0"+num:num;
    },
    date_format(time){
        var d=new Date(time*1000);
        return d.getFullYear()+"-"+this.two(d.getMonth()+1)+"-"+this.two(d.getDate());
    },
    injectScript(file, node) {
        node=node?node:"head";
        var th = document.getElementsByTagName(node)[0];
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        th.appendChild(s);
    }
}
