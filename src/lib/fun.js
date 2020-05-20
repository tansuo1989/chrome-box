
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
    local_key:{
        baidu_follow_list:"baidu_know_follow_list",//
    },
    $(el){
        return document.querySelector(el);
    },
    two(num){
        return num<10?"0"+num:num;
    },
    date_format(time){
        var d=new Date(time*1000);
        return d.getFullYear()+"-"+this.two(d.getMonth()+1)+"-"+this.two(d.getDate());
    },
    parseElement(htmlString){
        return new DOMParser().parseFromString(htmlString,'text/html').body.childNodes[0]
    },
    load_js(file,node,cb){
        node=node?node:"head";
        file=chrome.extension.getURL(file)
        let th = document.getElementsByTagName(node)[0];
        var s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', file);
        s.setAttribute("charset","utf-8");
        th.appendChild(s);
        s.onload=()=>{
            cb()
        }
    },
    insert_js(files,node,i){
        var arr=typeof files=="string"?[files]:files;
        var len=arr.length;
        //可以考虑直接把 js 代码放到script 内部去
        i=i>0?i:0;
        this.load_js(arr[i],node,()=>{
            if(i<len-1){
                this.insert_js(files,node,++i);
            }
        })
    }
}
