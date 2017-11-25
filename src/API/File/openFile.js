
const remote=require("electron").remote
var dialog=remote.dialog;


export function loadFileByPath(filepath){
    var path=filepath.replace(/\\/g,"/");
    var iconv = require('iconv-lite');  
    var fs = require('fs');  
    var fileStr = fs.readFileSync(path, {encoding:'binary'});  
    var buf = new Buffer(fileStr, 'binary');  
    var str = iconv.decode(buf,'GBK'); 
    console.log(str); 
    return str;
}

export function loadFile(){
    var filepath=dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
    return loadFileByPath(filepath[0]);
}

export function loadFile2(){
    var filepath=dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
    var result=[
        {path:''},
        {content:''}

    ];
    result.path=filepath[0];
    result.content=loadFileByPath(filepath[0]);
    return result;
}