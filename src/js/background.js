
var host="http://www.tansuo19.top/index.php?s=";
//点击拓展图标后,这在popup开启后，应该是无效的
chrome.browserAction.onClicked.addListener(function(d)
{  
    dd(d.title,d.url);
});

$.ajaxSetup({
	dataType:"json"
});

console.log("config",)
var config=localStorage.getItem("config");
if(config){
    config=JSON.parse(config);
    if(config.is_collect==1){
        //右键收藏
        console.log("collect")
        chrome.contextMenus.create({
            title: "收藏到读点", 
            type: "normal", 
            onclick:function(info,tab){
                dd(tab.title,tab.url);
            }
        });
    }
}
  


function dd(title,url){
	var data={
		title:title,
		url:url,
	}
	chrome.cookies.get({
		url:host,
		name:"token"
	},function(d){
		console.log(d);
		if(d&&d.value){
			data.token=d.value;
			mysend(data);
		}else{
			window.open(host+"/Note/login");	
		}
	})

}

function mysend(data){
	$.post(host+"/Home/Collect/from_net",data,function(d){
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
        var code=localStorage.getItem("code");
        var config=localStorage.getItem("config");
        var data={code:code,config:config,req:request,from:"background.js",sender:sender};
        sendResponse(data);
})
