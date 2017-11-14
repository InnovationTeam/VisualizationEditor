const state = {
    language: 'JavaScript',
    encode: 'UTF-8',
    returnType: 'CRLF',
    spaceType: 'Space',
    spaceLength: '4',
    row: 20,
    column: 10
}

const getters = {
    getLanguage: state => state.language,
    getEncode: state => state.encode,
    getReturnType: state => state.returnType,
    getSpaceInfo: state => state.spaceType + ':' + state.spaceLength,
    getCurrentCursorPlace: state => 'Row:' + state.row + ', Col:' + state.column
}

const mutations = {
    changeEncode(state, encode) {
        state.encode = encode
    },
    toggleReturnType(state) {
        state.returnType = state.returnType === 'CRLF' ? 'LF' : 'CRLF'
    },
    toggleSpaceType(state) {
        state.spaceType = state.spaceType === 'Space' ? 'Tab' : 'Space'
    },
    changeSpanceLength(state, length) {
        state.spaceLength = length
    },
    updateCurrentCursorPlace(state, {row, col}) {
        state.row = row
        state.col = col
    }
}

export default {
    state,
    getters,
    mutations
}