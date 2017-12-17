


function replace(self,findstr,replacestr)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor
    editor.find(findstr);
    editor.replace(replacestr);
}

function replaceAll(self,findstr,replacestr)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor
    editor.find(findstr);
    editor.replaceAll(replacestr);
}

module.exports = {
   replace,
   replaceAll
}