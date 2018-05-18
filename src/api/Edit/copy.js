
const remote=require('electron').remote;

function copy(editor)
{
    // var vm=self.$children[0];//获取当前编辑器指针
    // var editor = vm.editor
    var text=editor.getCopyText();
    return text;
}

function copyByElectron()
{
    let content = remote.getCurrentWebContents().copy();
    console.log(content);  
}

module.exports = {
    copy,
   copyByElectron
}