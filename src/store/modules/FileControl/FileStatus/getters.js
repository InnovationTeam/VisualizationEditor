export default {
    getOpenedFiles: (state, getters, rootState) => state.opened.map(id => rootState.FileControl.FileTreeControl.info[id]),
    getActiveFile: (state, getters, rootState) => rootState.FileControl.FileTreeControl.info[state.active],
    getOpenedIDs: state => state.opened,
    getActiveID: state => state.active,
    getTempID: state => state.temp,
    getContentByID: state => id => state.statuses[id].content,

    getStatus: state => state.active === '' ? {} : state.statuses[state.active],
    getLanguage: (state, getters) => getters.getStatus.language,
    getEncode: (state, getters) => getters.getStatus.encode,
    getReturnType: (state, getters) => getters.getStatus.returnType,
    getSpaceInfo: (state, getters) => getters.getStatus.spaceType + ':' + getters.getStatus.spaceLength,
    getCurrentCursorPlace: (state, getters) => 'Row:' + getters.getStatus.row + ', Col:' + getters.getStatus.column
}