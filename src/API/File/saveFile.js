

export function saveFile(self)
{
    var content=self.$refs.editor1.get();
    var filepath=self.filePath;
    var fs = require('fs');
    console.log(content); 
    fs.writeFile(filepath,content,function(err){
        if(err) throw err;
    });

}