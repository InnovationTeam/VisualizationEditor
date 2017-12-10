
const remote=require('electron').remote;



function copyByElectron()
{
    let content = remote.getCurrentWebContents().copy();
    console.log(content);  
}

module.exports = {
   copyByElectron
}