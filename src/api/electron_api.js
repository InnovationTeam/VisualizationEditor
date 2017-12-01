const remote = require('electron').remote;
const BrowserWindow = remote.BrowserWindow;

/*
    跟electron窗口操作相关的api
*/


//全局窗口
let win

//无边框窗口
function createWindow(){

    win = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000
      })
    //展示窗口
    win.show()

    win.on('closed', () => {
        win = null
      })


      if (process.env.NODE_ENV !== 'development') {
        global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
      }

      const winURL = process.env.NODE_ENV === 'development'
      ? `http://localhost:9080`
      : `file://${__dirname}/index.html`
      
      // 加载一个远程地址
      win.loadURL(winURL)

}


function close(){
    win.close();
}

function minimize(){
    win.minimize()
}

function maximize(){
    win.maximize()
}

 
module.exports={
    createNewWindow: createWindow,
    close: close,
    minimize: minimize,
    maximize: maximize
}