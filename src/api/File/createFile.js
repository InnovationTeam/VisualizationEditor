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


module.exports = {
    createDir,
    deleteDir,
    renameDir,
    watchDir,
    createFileByPath,
    createProject
}