export default {
    getMainChildren: state => state.children.map(id => state.info[id]),
    getMainChildrenIDs: state => state.children,

    getChildrenByID: state => id => state.info[id].children,

    getInfo: state => state.info,
    getInfoByID: state => id => state.info[id],
    getInfoByIDs: state => ids => ids.map(id => state.info[id])
}