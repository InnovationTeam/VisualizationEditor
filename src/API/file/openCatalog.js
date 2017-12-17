const remote = require('electron').remote;
const dialog = remote.dialog;
const fs = require('fs');
var nanoid = require('nanoid')



/*
    遍历文件夹，获取所有文件夹里面的文件信息，返回目录树。
*/

//info
let id_name = {}


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
            var id = nanoid()
           

            if(targetObj["children"])
            {
                item = {id:id,name:file,children:[]};
                targetObj["children"].push(id);
                id_name[id] = item
            }
            else
            {
               item = {id:id,name:file,children:[]};
               filesList.push(item);
               id_name[id] = item
            }

            readFile(path+'/'+file,filesList,item);
        }
        else
        {   
            //创建一个对象保存信息
            var obj = new Object()
            obj.size = states.size//文件大小，以字节为单位
            obj.name = file//文件名
            obj.path = path+'/'+file //文件绝对路径
            var item
            var id = nanoid()
            

            if(targetObj["children"])
            {
               item = {id:id,name:file}
               targetObj["children"].push(id)
               id_name[id] = item
            }
            else
            {
                item = {id:id,name:file}
                filesList.push(item)
                id_name[id] = item
            }
        }     
    }
}



function openCatalog(){

    //由窗口获取
    let path = dialog.showOpenDialog({properties:['openDirectory']})[0];
    let seg_path = path.split('\\')
    let name =seg_path[seg_path.length-1]
    //fileList在新的需求中指示起辅助作用，主要需要id_name和root_children
    let filesList = geFileList(path);
    let root_children = []
    for(let i=0; i<filesList.length; i++){
        root_children.push(filesList[i].id)
    }

    info = JSON.stringify(id_name)
    root_children_json = JSON.stringify(root_children)
    path = path.replace(/\\/g,'\\\\')
    let tree_json = '{"rootName":"#0","rootPath":"#1","children":#2,"info":#3}'.replace('#0',name).replace('#1',path).replace('#2',root_children_json).replace('#3',info);

    let catalog_tree = JSON.parse(tree_json)
    
    return catalog_tree
}



//这样导出存在bug, 无法识别JSON包,暂未解决
// module.exports = {
//     openCatalog: openCatalog
// }


export {openCatalog}
