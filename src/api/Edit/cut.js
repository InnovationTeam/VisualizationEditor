
const remote=require('electron').remote;


function cutByElectron()
{
    remote.getCurrentWebContents().cut();
}

module.exports = {
   cutByElectron
}