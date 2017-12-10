
const remote=require('electron').remote;

function cut(self)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor
    var text=editor.getCopyText();
    editor.clearSelection();
    return text;
}

function cutByElectron()
{
    remote.getCurrentWebContents().cut();
}

module.exports = {
    cut,
   cutByElectron
}