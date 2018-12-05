var config=localStorage.getItem("config");
if(config){
    var config=JSON.parse(config);
    $(".is_collect").val(config.is_collect);
    $(".is_gesture").val(config.is_gesture);
    $(".is_code").val(config.is_code);
}

$(".sub").click(()=>{
    var config={
        is_collect:$(".is_collect").val(),
        is_gesture:$(".is_gesture").val(),
        is_code:$(".is_code").val(),
    }
    localStorage.setItem("config",JSON.stringify(config));
    alert("设置成功");
})