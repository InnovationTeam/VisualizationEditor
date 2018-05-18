
const remote=require('electron').remote;

function cut(editor)
{
    // var vm=self.$children[0];//获取当前编辑器指针
    // var editor = vm.editor
    var text=editor.getCopyText();
    editor.removeLines();
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