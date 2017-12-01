var fs=require("fs");

export function createDir(dirname)
{

    fs.mkdir(dirname,function(err){
        console.log(err);
    })
}

export function  deleteDir(dirname)
{
    fs.rmdir(dirname,function(err){
        console.log(err);
    })
} 

export function renameDir(dirname,newDirname)
{
    fs.rename(dirname,newDirname,function(err){
        console.log(err);
    })
}

export function watchDir(dirname)
{
    fs.watch(dirname,function(eventname,filename){
        console.log(eventname);
        console.log(filename);
    })
}



export function createFileByPath(filepath)
{
    fs.writeFile(filename,function(){
        if(err){
            console.log(err);
            return;
        }
        console.log(filepath);
    })
}