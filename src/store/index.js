import Vue from 'vue'
import Vuex from 'vuex'
import FileStatus from './modules/file-status'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        FileStatus
    },
    state: {
        showLeftBar: false
    },
    mutations: {
      toggleLeftBar(state) {
        state.showLeftBar = !state.showLeftBar
      }
    }
}) 