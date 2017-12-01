const remote = require('electron').remote;
const dialog = remote.dialog;
const fs = require('fs');


/*
    遍历文件夹，获取所有文件夹里面的文件信息，返回目录树。
*/




function geFileList(path)
{
   var filesList = [];
   var targetObj = {};
   readFile(path,filesList,targetObj);
   return filesList;
}

//遍历读取文件
function readFile(path,filesList,targetObj)
{
   console.log(path)
   let files = fs.readdirSync(path);//需要用到同步读取
   files.forEach(walk);
   function walk(file)
   {  
        let states = fs.statSync(path+'/'+file);         
        if(states.isDirectory())
        {
            var item ;
            if(targetObj["children"])
            {
                item = {name:file,children:[]};
                targetObj["children"].push(item);
            }
            else
            {
               item = {name:file,children:[]};
               filesList.push(item);
            }

            readFile(path+'/'+file,filesList,item);
        }
        else
        {   
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = path+'/'+file; //文件绝对路径

            if(targetObj["children"])
            {
               var item = {name:file}
               targetObj["children"].push(item);
            }
            else
            {
                var item = {name:file};
                filesList.push(item);
            }
        }     
    }
}

//写入文件utf-8格式
function writeFile(fileName,data)
{  
  fs.writeFile(fileName,data,'utf-8',complete);
  function complete()
  {
     console.log("文件生成成功");
  } 
}



function openCatalog(){

    //由窗口获取
    let path = dialog.showOpenDialog({properties:['openDirectory']})[0];
    // console.log(path)
    let seg_path = path.split('\\')
    let name =seg_path[seg_path.length-1]
    // console.log(name)

    let filesList = geFileList(path);
    // console.log(filesList)
    let string1 = JSON.stringify(filesList);
    // console.log(string1)
    path = path.replace(/\\/g,'\\\\')
    // console.log(path)
    let string2 = '{"name":"#0","path":"#1","children":#2}'.replace('#0',name).replace('#1',path).replace("#2",string1);
    
    let catalog_tree = JSON.parse(string2)
    
    return catalog_tree
}


// module.exports = {
//     openCatalog: openCatalog
// }


export {openCatalog}