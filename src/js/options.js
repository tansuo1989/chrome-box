
var config=local.get("config",{});
console.log("config",config)
$(".is_collect").val(config.is_collect==1?1:0);
$(".is_gesture").val(config.is_gesture==1?1:0);
$(".is_code").val(config.is_code==1?1:0);
$(".show").val(config.show?config.show:"qrcode");
$(".collect_url").val(config.collect_url?config.collect_url:"http://www.tansuo19.top/Home/Collect/from_net");
$(".login_url").val(config.login_url?config.login_url:"http://www.tansuo19.top/Note/login");

function is_show_collect_more(){
    var is_collect=$(".is_collect").val();
    if(is_collect==1){
        $(".collect-more").show();
    }else{
        $(".collect-more").hide();
    }
}
is_show_collect_more();

$(".is_collect").change(function(){
    is_show_collect_more();
})


$(".sub").click(()=>{
    var config={
        is_collect:$(".is_collect").val(),
        collect_url:$(".collect_url").val(),
        login_url:$(".login_url").val(),
        is_gesture:$(".is_gesture").val(),
        is_code:$(".is_code").val(),
        show:$(".show").val(),
    }
    local.set("config",config);
    alert("设置成功");
})