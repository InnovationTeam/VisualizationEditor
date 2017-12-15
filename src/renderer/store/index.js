import Vue from 'vue'
import Vuex from 'vuex'
import FileControl from './modules/FileControl'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        FileControl,
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