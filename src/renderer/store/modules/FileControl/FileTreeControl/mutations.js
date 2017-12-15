import TestFile from '@/assets/test-new-tree.json'
import {openCatalog} from '@/../api/File/openCatalog'

export default {
    OPEN_FOLDER(state) {
        console.log('use api to get the file tree')
        let FileTree = openCatalog()
        // console.log(FileTree)
        // state.rootName = TestFile.rootName
        // state.rootPath = TestFile.rootPath
        // state.children = TestFile.children
        // state.info = TestFile.info
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