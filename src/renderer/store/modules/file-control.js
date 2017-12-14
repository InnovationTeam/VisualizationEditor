import {openCatalog} from '../../../API/catalog.js'

const state = {
    directory: {}
}

const getters = {
    getRootPath: state => state.directory.path,
    getRootChildren: state => state.directory.children
}

const mutations = {
    openDirectory(state) {
        state.directory = openCatalog()
    }
}

export default {
    state,
    getters,
    mutations
}