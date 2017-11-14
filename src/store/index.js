import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showLeftBar: false
    },
    mutations: {
      toggleLeftBar(state) {
        state.showLeftBar = !state.showLeftBar
      }
    }
}) 