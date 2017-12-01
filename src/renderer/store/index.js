import Vue from 'vue'
import Vuex from 'vuex'
import FileStatus from './modules/file-status'
import FileControl from './modules/file-control'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        FileStatus,
        FileControl
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
