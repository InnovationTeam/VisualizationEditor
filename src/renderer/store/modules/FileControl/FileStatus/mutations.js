import Vue from 'vue'

export default {
    OPEN_TEMPORARILY(state, { id, path }) {
        if (state.opened.indexOf(id) === -1) {
            // 如果文件未被缓存，则去读取文件
            if (state.statuses[id] === undefined) {
                console.log('use api to open file and get file\'s status, path: ' + path)
                Vue.set(state.statuses, id, {
                    id: id,
                    language: 'JavaScript',
                    encode: 'UTF-8',
                    returnType: 'CRLF',
                    spaceType: 'Space',
                    spaceLength: 4,
                    row: 1,
                    column: 1,
                    content: id,
                })
            }

            if (state.temp === '') {
                state.opened.splice(state.opened.indexOf(state.active) + 1, 0, id)
            } else {
                state.opened.splice(state.opened.indexOf(state.temp), 1, id)
            }
            state.temp = id
        }
        state.active = id
    },
    OPEN_FILE(state, { id, path }) {
        // 双击打开文件始终在单击打开临时文件之后
        state.temp = ''
        state.active = id
    },
    CLOSE_FILE(state, { id }) {
        console.log('use api to close file')
        delete state.statuses[id]

        let index = state.opened.indexOf(id)
        state.opened.splice(index, 1)
        if (state.opened.length === 0)
            state.active = ''
        else if (state.active === id)
            state.active = state.opened[index === 0 ? index : index - 1]
    },
    ACTIVE_FILE(state, { id }) {
        state.active = id
    },


    CHANGE_ENCODE(state, encode) {
        state.statuses[state.active].encode = encode
    },
    TOGGLE_RETURN_TYPE(state) {
        state.statuses[state.active].returnType = state.statuses[state.active].returnType === 'CRLF' ? 'LF' : 'CRLF'
    },
    TOGGLE_SPACE_TYPE(state) {
        state.statuses[state.active].spaceType = state.statuses[state.active].spaceType === 'Space' ? 'Tab' : 'Space'
    },
    CHANGE_SPACE_LENGTH(state, length) {
        state.statuses[state.active].spaceLength = length
    },
    UPDATE_CURRENT_CURSOR_PLACE(state, { row, col }) {
        state.statuses[state.active].row = row
        state.statuses[state.active].col = col
    }
}