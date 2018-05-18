const remote=require("electron").remote
var dialog=remote.dialog;
var fs=require("fs");

function createDir(dirpath)
{

    fs.mkdirSync(dirpath,function(err){
        console.log(dirpath);
        //console.log(err);
    })
}

function  deleteDir(dirpath)
{
    fs.rmdir(dirpath,function(err){
        console.log(err);
    })
} 

function renameDir(dirpath,newDirpath)
{
    fs.rename(dirpath,newDirpath,function(err){
        console.log(err);
    })
}

function watchDir(dirpath)
{
    fs.watch(dirpath,function(eventname,filename){
        console.log(filename);
    })
}




function createFileByPath(filepath,data='')
{
    fs.writeFile(filepath,data,function(){
        if(err){
            console.log(filepath);
            //console.log(err);
            return;
        }
        console.log(filepath+"ok");
    })
}

function createProject() 
{


    var projectPath=dialog.showSaveDialog();
    var path=projectPath.replace(/\\/g,"/");

    createDir(projectPath);

    projectPath=projectPath+"/";
    
    var dirname_pages='pages';
    var dirname_index='index';
    var index_js='index.js';
    var index_wxml='index.wxml';
    var index_wxss='index.wxss';
    var dirname_logs='logs';
    var logs_js='logs.js';
    var logs_json='logs.json';
    var logs_wxml='logs.wxml';
    var logs_wxss='logs.wxss';
    var dirname_utils='utils';
    var utils_js='util.js';
    
    var app_js='app.js';
    var app_json='app.json';
    var app_wxss='app.wxss';


    var dirpath=projectPath+dirname_pages;
    createDir(dirpath);
    dirpath=projectPath+dirname_utils;
    createDir(dirpath);

    var filepath=projectPath+app_js;
    createFileByPath(filepath);
    filepath=projectPath+app_json;
    createFileByPath(filepath);
    filepath=projectPath+app_wxss;
    createFileByPath(filepath);    

    var dirpath_index=projectPath+dirname_pages+"/"+dirname_index;
    createDir(dirpath_index);
    var dirpath_logs=projectPath+dirname_pages+"/"+dirname_logs;
    createDir(dirpath_logs);
    filepath=projectPath+dirname_utils+"/"+utils_js;
    createFileByPath(filepath);

    filepath=dirpath_index+"/"+index_js;
    createFileByPath(filepath);
    filepath=dirpath_index+"/"+index_wxml;
    createFileByPath(filepath);
    filepath=dirpath_index+"/"+index_wxss;
    createFileByPath(filepath);

    filepath=dirpath_logs+"/"+logs_js;
    createFileByPath(filepath);
    filepath=dirpath_logs+"/"+logs_json;
    createFileByPath(filepath);
    filepath=dirpath_logs+"/"+logs_wxml;
    createFileByPath(filepath);
    filepath=dirpath_logs+"/"+logs_wxss;
    createFileByPath(filepath);

}

function copyProject(){
    /*
     * 复制目录中的所有文件包括子目录
     * @param{ String } 需要复制的目录
     * @param{ String } 复制到指定的目录
     */

     var fromPath='static/template/wxsmall'
     let p = dialog.showOpenDialog({properties:['openDirectory']})[0]
     var toPath=p.replace(/\\/g,"/");

    var copy = function( src, dst ){
        // 读取目录中的所有文件/目录
        fs.readdir( src, function( err, paths ){
            if( err ){
                throw err;
            }

            paths.forEach(function( path ){
                var _src = src + '/' + path,
                    _dst = dst + '/' + path,
                    readable, writable;
                fs.stat( _src, function( err, st ){
                    if( err ){
                        throw err;
                    }
                    // 判断是否为文件
                    if( st.isFile() ){
                        // 创建读取流
                        readable = fs.createReadStream( _src );
                        // 创建写入流
                        writable = fs.createWriteStream( _dst );
                        // 通过管道来传输流
                        readable.pipe( writable );
                    }
                    // 如果是目录则递归调用自身
                    else if( st.isDirectory() ){
                        exists( _src, _dst, copy );
                    }
                });
            });
        });
    };

    // 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
    var exists = function( src, dst, callback ){
        fs.exists( dst, function( exists ){
            // 已存在
            if( exists ){
                callback( src, dst );
            }

            // 不存在
            else{
                fs.mkdir( dst, function(){
                    callback( src, dst );
                });
            }
        });
    };

    // 复制目录
    exists(fromPath,toPath,copy );
    return p
}


module.exports = {
    createDir,
    deleteDir,
    renameDir,
    watchDir,
    createFileByPath,
    createProject,
    copyProject
}