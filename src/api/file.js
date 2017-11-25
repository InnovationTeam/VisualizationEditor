const remote = require('electron').remote;
const dialog = remote.dialog;

var fs = require('fs')

//打开文件窗口
exports.openFile = function openFile(){

    var file_name = dialog.showOpenDialog({properties:['openDirectory']});
    console.log(file_name)
}





