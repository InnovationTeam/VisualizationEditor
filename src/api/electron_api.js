const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;


//无边框窗口
exports.createNewWindow = function createNewWindow(){
    var win = new BrowserWindow({width:800, height:600,frame:false})
    //展示窗口
    win.show()

    //最小化、最大化、关闭窗口
    win.close()
    win.maximize()
    win.minimize()

    //设置可拖动区域
    //Vue中添加样式，如：
    // button {
    //     -webkit-app-region: drag;
    //   }

    //设置伸缩窗口
    //有点难，先与前端沟通
    
    //思考，一个窗口创建出来后是不是独立的进程，
    //怎么知道操作是对哪一个窗口进行。

}




