const remote = require('electron').remote;
const dialog = remote.dialog;

var fs = require('fs')

module.exports = {
    openFile: openFile
}

//打开文件窗口
function openFile(){

    var file_name = dialog.showOpenDialog({properties:['openDirectory']});
    path = file_name[0]
    seg_path = path.split('\\')
    name =seg_path[seg_path.length-1]
    console.log(name)
    console.log(path)
}





