const remote=require("electron").remote
var dialog=remote.dialog;
var fs=require("fs");
//import saveFile from './saveFile'

function watchFile(self,filepath)
{
    fs.watchFile(filepath,function(curr,prev){
        var vm=self.$children[0];//获取当前编辑器指针
        var editor = vm.editor;
        var fileStr = fs.readFileSync(filepath, {encoding:'binary'}); 
        editor.setValue(fileStr)
        console.log(fileStr); 
    })
}

function unwatchFile(filepath)
{
    fs.unwatchFile(filepath)
}

module.exports = {
    
    watchFile,
    unwatchFile,
    
}