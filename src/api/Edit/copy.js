
const {ipcRenderer}=require('electron')


function copy(self)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor
    console.log(editor.copyLinesDown());
}

function copyByElectron()
{
    ipcRenderer.send('copytest','copytest');
}

module.exports = {
   copy,
   copyByElectron
}