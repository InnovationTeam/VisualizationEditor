// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui'
import VueContextMenu from 'vue-contextmenu'

// css样式需要单独引入
import 'element-ui/lib/theme-chalk/index.css'
// 加载并渲染App
import App from './App'
import router from './router'

Vue.config.productionTip = false
// 在Vue中使用elemrnt-ui
Vue.use(ElementUI)
Vue.use(VueContextMenu)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: `<div><App/></div>`,
  components: { App }
})
