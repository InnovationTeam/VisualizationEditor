import createFile from './createFile'
import loadFile from './loadFile'
import saveFile from './saveFile'


export default {
    createFileByPath:createFile.createFileByPath,
    createProject:createFile.createProject,
    createDir:createFile.createDir,
    deleteDir:createFile.deleteDir,
    renameDir:createFile.renameDir,
    watchDir:createFile.watchDir,
    loadFile:loadFile.loadFile,
    loadFileByPath:loadFile.loadFileByPath,
    saveFile: saveFile.saveFile,
    saveAs:saveFile.saveAs
}