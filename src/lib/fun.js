
var local={
    get(key,def){
        var re=localStorage.getItem(key);
        return re?JSON.parse(re):(def?def:false);
    },
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    }
}