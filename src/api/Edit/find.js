


function find(self,findstr)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor
    editor.find(findstr);
}

function findAll(self,findstr)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor
    editor.findAll(findstr);
}

module.exports = {
   find,
   findAll
}