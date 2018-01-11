
var host="http://www.tansuo19.top/index.php?s=";
//点击拓展图标后
chrome.browserAction.onClicked.addListener(function(d)
{  
    dd(d.title,d.url);
});

$.ajaxSetup({
	dataType:"json"
  });

  
//右键
chrome.contextMenus.create({
	title: "收藏到读点", 
	type: "normal", 
	onclick:function(info,tab){
     dd(tab.title,tab.url);
    }
});

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


