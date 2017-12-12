import TestFile from '@/assets/test-new-tree.json'

export default {
    OPEN_FOLDER(state) {
        console.log('use api to get the file tree')

        state.rootName = TestFile.rootName
        state.rootPath = TestFile.rootPath
        state.children = TestFile.children
        state.info = TestFile.info
    },
    CHANGE_NAME(state, {id, newName}) {
        console.log('use api to change name')
        state.info[id].name = newName
    }
}