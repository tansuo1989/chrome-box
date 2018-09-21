//网页内执行的代码

//获取代码并执行
chrome.extension.sendRequest({name:"haha"},function(d){
    var code=JSON.parse(d.code);
    // console.log(code);
    var fn=new Function(code);
    fn();
   
})

//刷新页面
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log("contentjs:",request);
        if(request.action=="reload"){
            location.reload();
        }
})

