export default {
    getRootName: state => state.rootName,
    getRootPath: state => state.rootPath,
    getRootChildren: state => state.children.map(id => state.info[id]),

    getInfo: state => state.info,
    getInfoByID: state => id => state.info[id],
    getInfoByIDs: state => ids => ids.map(id => state.info[id])
}