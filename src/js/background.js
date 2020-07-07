

//点击拓展图标后,这在popup开启后，应该是无效的
// chrome.browserAction.onClicked.addListener(function(d){  
//     dd(d.title,d.url);
// });

$.ajaxSetup({
	dataType:"json"
});
var config=local.get("config",{});
/* 
config={
    is_collect:1 是否启用收藏
    collect_url:"",
    login_url:"",
    is_gesture:1 是否启用手势
    is_code:1 是否执行驻入代码
    show:"qrcode"/"input" 先展开二维码或输入框
}
*/

//右键收藏
if(config.is_collect==1 && config.collect_url){
    chrome.contextMenus.create({
        title: "收藏到读点", 
        type: "normal", 
        onclick:function(info,tab){
            dd(tab.title,tab.url);
        }
    });
}


function dd(title,url){
	var data={
		title:title,
		url:url,
	}
	chrome.cookies.get({
		url:host,
		name:"token",
	},function(d){
		console.log(d);
		if(d&&d.value){
			data.token=d.value;
			mysend(data);
		}else{
			window.open(config.login_url);	
		}
	})

}

function mysend(data){
	$.post(config.collect_url,data,function(d){
	   console.log(d);
	   if(d.status!=1){
		 if(d.info=="请先登录"){
            window.open(host+"/Note/login");
		 }else{
			 alert(d.info);
		 }
	   }
	})
}

//返回 localStorage中存的代码
chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        var action=request.action;
        if(action=="getcode"){
            var code=local.get("code");
            var config=local.get("config");
            var data={
                code:code,
                config:config,
                req:request,from:"background.js",
                sender:sender
            };
            sendResponse(data);
        }else if(action=="close"){
            chrome.tabs.remove(sender.tab.id)//关闭当前标签页
        }    
})






