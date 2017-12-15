import createFile from './createFile'
import loadFile from './loadFile'
import saveFile from './saveFile'

export default{
    createDir:createFile.createDir,
    deleteDir:createFile.deleteDir,
    renameDir:createFile.renameDir,
    watchDir:createFile.watchDir,
    watchFile:createFile.watchFile,
    unwatchFile:createFile.unwatchFile,
    createFileByPath:createFile.createFileByPath,
    createProject:createFile.createProject,
    loadFile:loadFile.loadFile,
    loadFileByPath:loadFile.loadFileByPath,
    saveFile: saveFile.saveFile,
    saveAs:saveFile.saveAs
}