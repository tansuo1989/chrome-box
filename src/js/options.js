
var config=local.get("config",{});
$(".is_collect").val(config.is_collect);
$(".is_gesture").val(config.is_gesture);
$(".is_code").val(config.is_code);
$(".show").val(config.show?config.show:"qrcode");


$(".sub").click(()=>{
    var config={
        is_collect:$(".is_collect").val(),
        is_gesture:$(".is_gesture").val(),
        is_code:$(".is_code").val(),
        show:$(".show").val(),
    }
    local.set("config",config);
    alert("设置成功");
})