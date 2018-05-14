import Vue from 'vue'
import Vuex from 'vuex'
import FileControl from './modules/FileControl'
import ElementControl from './modules/ElementControl'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        FileControl,
        ElementControl
    },
    state: {
        showLeftBar: false,
        useCodeEditor: true,
        useVisualEditor: false
    },
    mutations: {
      toggleLeftBar(state) {
        state.showLeftBar = !state.showLeftBar
      },
      USE_CODE_EDITOR(state) {
        state.useCodeEditor = true
        state.useVisualEditor = false
      },
      USE_VISUAL_EDITOR(state) {
        state.useVisualEditor = true
        state.useCodeEditor = false
      }
    }
}) 