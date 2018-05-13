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
            father: id
        }
    }
}