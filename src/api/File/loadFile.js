
const remote=require("electron").remote
var dialog=remote.dialog;


export function loadFileByPath(filepath){
    var path=filepath.replace(/\\/g,"/");
    var iconv = require('iconv-lite');  
    var fs = require('fs');  
    var fileStr = fs.readFileSync(path, {encoding:'binary'});  
    // var buf = new Buffer(fileStr, 'binary');  
    // var str = iconv.decode(buf,'GBK'); 
    
    console.log(fileStr); 
    return str;
}

export function loadFile()//加载文件，返回值为所加载文件的内容
{
    var filepath=dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
    return loadFileByPath(filepath[0]);
}

export function loadFile2()//加载文件，返回值为一个json，第一个值为path，为文件路径，第二个值为content，是打开文件的内容
{
    var filepath=dialog.showOpenDialog({properties: ['openFile', 'multiSelections']});
    var result=[
        {path:''},
        {content:''}

    ];
    result.path=filepath[0];
    result.content=loadFileByPath(filepath[0]);
    return result;
}