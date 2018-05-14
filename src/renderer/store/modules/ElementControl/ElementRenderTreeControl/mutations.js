export default {
    APPEND_CHILD(state, { id, tagName, cfgData }) {
        let newID = Math.floor(Math.random() * 10000).toString()
        while (state.info[newID] !== undefined) {
            newID = Math.floor(Math.random() * 10000).toString()
        }

        if (id === 'main') {
            state.children.push(newID)
        }
        else {
            state.info[id].children.push(newID)
        }

        state.info[newID] = {
            id: newID,
            cfgData: JSON.parse(JSON.stringify(cfgData)),
            tagName: tagName,
            children: [],
            fatherID: id
        }
    },
    MOVING_ELEMENT(state, {fatherID, targetID, elementID}) {
        console.log(targetID)

        // 在父节点中删除移动的节点
        let children = []
        if (fatherID === 'main') {
            children = state.children
        }
        else {
            children = state.info[fatherID].children
        }
        children.splice(children.indexOf(elementID), 1)

        // 在目标节点中添加移动的节点
        if (targetID === 'main') {
            state.children.push(elementID)
        }
        else {
            state.info[targetID].children.push(elementID)
        }

        // 将移动节点的父节点改为目标节点
        state.info[elementID].fatherID = targetID
    }
}