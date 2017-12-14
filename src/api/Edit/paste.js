
const remote=require('electron').remote;

function paste(self,copytext)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor
    editor.insert(copytext);
}

function pasteByElectron()
{
    remote.getCurrentWebContents().paste();
}

module.exports = {
    paste,
    pasteByElectron
}