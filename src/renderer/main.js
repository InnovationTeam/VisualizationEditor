// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 加载并渲染App
import App from './App'
import store from './store'

import Hierarchy from "./components/Hierarchy";

Vue.config.productionTip = false
Vue.use(Hierarchy)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: `<div><App/></div>`,
  components: { App }
})
