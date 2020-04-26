
var fun={
    two(num){
        return num<10?"0"+num:num;
    },
    date_format(time){
        var d=new Date(time*1000);
        return d.getFullYear()+"-"+this.two(d.getMonth()+1)+"-"+this.two(d.getDate());
    },
    parseElement(htmlString){
        return new DOMParser().parseFromString(htmlString,'text/html').body.childNodes[0]
    }
}


function add_question_info(){
    var page=window.F.context("page");
    var url="https://zhidao.baidu.com/usercenter?uid="+page.encodeUid;
    var date=fun.date_format(page.createTime);
    var xm=page.userName?page.userName:"no_name";
    var html="<a href='"+url+"' target='_blank'>@"+xm+": "+date+"</a>";
    html=fun.parseElement(html);
    document.querySelector("#v-times").parentNode.appendChild(html);
}
add_question_info();

document.querySelector("#answer-bar").addEventListener("click",()=>{
    window.F.context("page")['cidTop']="74";
    console.log(F.context("page"));
})


 
//
UE.registerUI('replacekey', function(editor, insertcode) {
    //注册按钮执行时的command命令,用uiName作为command名字，使用命令默认就会带有回退操作
    editor.registerCommand(insertcode, {
        execCommand:function(cmdName, item){
            var html = '<input style="border:#6CF solid 1px;" truevalue="'  + item.value +
                '" value="'+ item.label + '" type="button" />';
            this.execCommand('insertHtml', html);
        }
    });
    //创建下拉菜单中的键值对，这里我用字体大小作为例子
    var objItems = [{id:1, name:'php'},{id:2, name:'javascript'},{id:3, name:'java'}];
    var items = [];
    for (var i = 0; i < objItems.length; i++){
        var item = objItems[i];
        items.push({
            //显示的条目
            label: item['name'],
            //选中条目后的返回值
            value: item['id']
        });
    }
    //创建下拉框
    var combox = new UE.ui.Combox({
        //需要指定当前的编辑器实例
        editor : editor,
        //添加条目
        items : items,
        //当选中时要做的事情
        onselect : function (t, index) {
            //拿到选中条目的值
            editor.execCommand(insertcode, this.items[index]);
            console.log("exec", this.items[index]);
            //t.setValue(t.initValue);
        },
        //提示
        title:'my',
        //当编辑器没有焦点时，combox默认显示的内容
        initValue:'代码'
    });
    return combox;
});