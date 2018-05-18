


function find(editor,findstr)
{
    // var vm=self.$children[0];//获取当前编辑器指针
    // var editor = vm.editor
    editor.find(findstr);
}

function findAll(editor,findstr)
{
    // var vm=self.$children[0];//获取当前编辑器指针
    // var editor = vm.editor
    editor.findAll(findstr);
}

module.exports = {
   find,
   findAll
}