
const remote=require("electron").remote
var dialog=remote.dialog;


function loadFileByPath(filepath){
    var path=filepath.replace(/\\/g,"/");
    //var iconv = require('iconv-lite');  
    var fs = require('fs');  
    var fileStr = fs.readFileSync(path, {encoding:'binary'});  
    // var buf = new Buffer(fileStr, 'binary');  
    // var str = iconv.decode(buf,'GBK'); 
    
    console.log(fileStr); 
    return fileStr;
}

function loadFile()//加载文件，返回值为一个json，第一个值为path，为文件路径，第二个值为content，是打开文件的内容
{
    var filepath=dialog.showOpenDialog({properties: ['openFile']});
    var result=[
        {path:''},
        {content:''}

    ];
    result.path=filepath[0];
    result.content=loadFileByPath(filepath[0]);
    return result;
}

function loadDirpath()
{
    var dirpath=dialog.showOpenDialog({properties: ['openDirectory']});
    return dirpath;
}

module.exports = {
    loadFile,
    loadFileByPath,
    loadDirpath
}