
$(function(){
    var code=localStorage.getItem("code");
    $(".code").val(JSON.parse(code));
})


$(".del").click(function(){
    $(".code").val("");
    localStorage.removeItem("code");
})

$(".sub").click(function(){
    var text=$(".code").val();
    localStorage.code=JSON.stringify(text);
    chrome.tabs.getSelected(function(tabs){
        console.log(tabs)
        window.close();
        chrome.tabs.sendRequest(tabs.id, {action: "reload"},function(){

        });
    });   
})
