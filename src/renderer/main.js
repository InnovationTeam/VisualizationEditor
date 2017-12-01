// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入element-ui

// css样式需要单独引入
// 加载并渲染App
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// 在Vue中使用elemrnt-ui

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: `<div><App/></div>`,
  components: { App }
})
