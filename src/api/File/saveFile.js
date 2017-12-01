
function saveFile(self)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor;

    var content=editor.getValue();//获取当前编辑器内容

    var filepath=self.filePath;//获取当前编辑器所打开的文件的路径
    var fs = require('fs');
    console.log(content); 
    fs.writeFile(filepath,content,function(err){
        if(err) throw err;
    });
}
module.exports = {
    saveFile: saveFile
}