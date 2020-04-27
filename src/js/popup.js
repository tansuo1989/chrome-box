
$(function(){

init();

function init(){
    $(".code").val(local.get("code",)+"");
    var config=local.get("config");
    if(config.show&&config.show=="input"){
        show("input");
    }else{
        show("qrcode");
    }
    chrome.tabs.getSelected(function(d){
        console.log(d);
        $(".qrcode").qrcode(d.url);
    })
}

function show(s){
    if(s=="input"){
        $(".show-code").hide();
        $(".qrcode").hide();
        $(".sub").show();
        $(".del").show();
        $(".code").show();
        $(".show-qrcode").show();
        $(".container").css({
            width:400
        })
    }else{
        $(".code").hide();
        $(".show-qrcode").hide();
        $(".sub").hide();
        $(".del").hide();
        $(".qrcode").show();
        $(".show-code").show();
        $(".container").css({
            width:256
        })
    }
}


$(".del").click(function(){
    $(".code").val("");
    localStorage.removeItem("code");
})

$(".sub").click(function(){
    var text=$(".code").val();
    local.set("code",text);
    chrome.tabs.getSelected(function(tabs){
        console.log(tabs)
        window.close();
        chrome.tabs.sendRequest(tabs.id, {action: "reload"},function(){

        });
    });   
})


$(".show-code").click(function(){
      show("input");
})
$(".show-qrcode").click(function(){
    show("qrcode");
})




})//end