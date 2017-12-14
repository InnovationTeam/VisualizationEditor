


function redo(self)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor
    editor.redo();
}

module.exports = {
    redo
}