import createFile from './createFile'
import loadFile from './loadFile'
import saveFile from './saveFile'
import watchFile from'./watchFile'

export default{
    createDir:createFile.createDir,
    deleteDir:createFile.deleteDir,
    renameDir:createFile.renameDir,
    watchDir:createFile.watchDir,
    watchFile:watchFile.watchFile,
    unwatchFile:watchFile.unwatchFile,
    createFileByPath:createFile.createFileByPath,
    createProject:createFile.createProject,
    loadFile:loadFile.loadFile,
    loadFileByPath:loadFile.loadFileByPath,
    saveFile: saveFile.saveFile,
    saveAs:saveFile.saveAs
}