
const remote=require('electron').remote;


function pasteByElectron()
{
    remote.getCurrentWebContents().paste();
}

module.exports = {
    pasteByElectron
}