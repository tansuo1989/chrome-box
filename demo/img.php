<?php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
set_time_limit(0);

$p=$_POST;
function mtime(){
    return str_replace(".","",microtime(true));
}

function save($data,$dir="default"){
    if(!$data||count($data)==0){exit("fail:no imgs");}
    $dir="./girls/".$dir."/";
    is_dir($dir)?:mkdir($dir);
    $i=0;
    $j=0;
    foreach($data as $v){
        if(!$v){continue;}
        $file=file_get_contents($v);
        if(!$file){continue;}
        $fname=mtime()."_".md5($v).".png";
        if(file_put_contents($dir.$fname,$file)){
            $i++;
        }else{
        $j++;
        }
    }
    echo "succ:{$i},fail:{$j}";
}

save($p['imgs'],$p['dir']);
