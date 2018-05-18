import TestFile from '@/assets/test-new-tree.json'
import {openCatalog, openCatalogByPath} from '@/../api/File/openCatalog'

export default {
    OPEN_FOLDER(state) {
        console.log('use api to get the file tree')
        let FileTree = openCatalog()
        state.rootName = FileTree.rootName
        state.rootPath = FileTree.rootPath
        state.children = FileTree.children
        state.info = FileTree.info
    },
    OPEN_FOLDER_BY_PATH(state, {path}) {
        let FileTree = openCatalogByPath(path)
        state.rootName = FileTree.rootName
        state.rootPath = FileTree.rootPath
        state.children = FileTree.children
        state.info = FileTree.info
    },
    CHANGE_NAME(state, {id, newName}) {
        console.log('use api to change name')
        state.info[id].name = newName
    }
}