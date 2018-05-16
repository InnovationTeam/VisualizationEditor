// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 加载并渲染App
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: `<div><App/></div>`,
  components: { App }
})
