var fs=require("fs");

function createDir(dirname)
{

    fs.mkdir(dirname,function(err){
        console.log(err);
    })
}

function  deleteDir(dirname)
{
    fs.rmdir(dirname,function(err){
        console.log(err);
    })
} 

function renameDir(dirname,newDirname)
{
    fs.rename(dirname,newDirname,function(err){
        console.log(err);
    })
}

function watchDir(dirname)
{
    fs.watch(dirname,function(eventname,filename){
        console.log(eventname);
        console.log(filename);
    })
}



function createFileByPath(filepath)
{
    fs.writeFile(filename,function(){
        if(err){
            console.log(err);
            return;
        }
        console.log(filepath);
    })
}

module.exports = {
    createDir,
    deleteDir,
    renameDir,
    watchDir,
    createFileByPath,
}