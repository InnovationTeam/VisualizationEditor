// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入element-ui
import ElementUI from 'element-ui'
// css样式需要单独引入
import 'element-ui/lib/theme-chalk/index.css'
// 加载并渲染App
import App from './App'
import router from './router'
import TreeMenu from './components/TreeMenu'
import TestFile from './assets/test-tree.json'

Vue.config.productionTip = false
// 在Vue中使用elemrnt-ui
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: `<div">
                <App/>
                <template v-for="r in root">
                  <TreeMenu v-bind="{root: r, parentPath: 'root'}"/>
                </template>
             </div>`,
  data: {
    root: TestFile
  },
  components: { TreeMenu }
})
