

function getCursorPosition(self)
{
    var vm=self.$children[0];//获取当前编辑器指针
    var editor = vm.editor;
    return editor.getCursorPosition();
}

function moveCursorDown(self)
{
    var vm=self.$children[0];
    var editor=vm.editor;
    var select=editor.getSelection();
    select.moveCursorDown();
}

function moveCursorUp(self)
{
    var vm=self.$children[0];
    var editor=vm.editor;
    var select=editor.getSelection();
    select.moveCursorUp();
}

function selectAll(self)
{
    var vm=self.$children[0];
    var editor=vm.editor;
    var select=editor.getSelection();
    select.selectAll();
}

function copyLinesDown(self)
{
    var vm=self.$children[0];
    var editor=vm.editor;
    editor.copyLinesDown();
}


function copyLinesUp(self)
{
    var vm=self.$children[0];
    var editor=vm.editor;
    editor.copyLinesUp();
}

module.exports={
    getCursorPosition,
    moveCursorDown,
    moveCursorUp,
    selectAll,
    copyLinesDown,
    copyLinesUp
}