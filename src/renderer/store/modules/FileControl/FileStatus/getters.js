import fs from 'fs'

export default {
    getOpenedFiles: (state, getters, rootState) => state.opened.map(id => rootState.FileControl.FileTreeControl.info[id]),
    getActiveFile: (state, getters, rootState) => rootState.FileControl.FileTreeControl.info[state.active],
    getOpenedIDs: state => state.opened,
    getActiveID: state => state.active,
    getActivePath: (state, getters) => getters.getStatus.path,
    getActiveWXSSFilePath(state, getters) { 
        let path = ''
        if(getters.getActivePath !== undefined) {
            let index = getters.getActivePath.lastIndexOf('.')
            path = getters.getActivePath.substring(0, index)
            path = path + '.wxss'
            if(!fs.existsSync(path))
                path = ''
        }   
        return path
    },
    getActiveWXMLFilePath(state, getters) { 
        let path = ''
        if(getters.getActivePath !== undefined) {
            let index = getters.getActivePath.lastIndexOf('.')
            path = getters.getActivePath.substring(0, index)
            path = path + '.wxml'
            if(!fs.existsSync(path))
                path = ''
        }   
        return path
    },
    getActiveWXSSCacheFilePath(state, getters) { 
        let path = '.\\static\\cache.css'  
        return path
    },
    getTempID: state => state.temp,
    getContentByID: state => id => state.statuses[id].content,

    getStatus: state => state.active === '' ? {} : state.statuses[state.active],
    getLanguage: (state, getters) => getters.getStatus.language,
    getEncode: (state, getters) => getters.getStatus.encode,
    getReturnType: (state, getters) => getters.getStatus.returnType,
    getSpaceInfo: (state, getters) => getters.getStatus.spaceType + ':' + getters.getStatus.spaceLength,
    getCurrentCursorPlace: (state, getters) => 'Row:' + getters.getStatus.row + ', Col:' + getters.getStatus.column
}