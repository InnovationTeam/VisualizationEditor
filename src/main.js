// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
// import App from './App'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import File from './components/File'
import Folder from './components/Folder'
import TreeMenu from './components/TreeMenu'
import TestFile from './assets/test-tree.json'

Vue.config.productionTip = false
// Vue.use(ElementUI)

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<File/>',
//   data:{
//     type: "less"
//   },
//   components: { File }
// })


// new Vue({
//   el: '#app',
//   template: '<div style="width: 500px;"><File/><File/><Folder :folderID="id"/></div>',
//   store,
//   data: {
//     id: '12'
//   },
//   components: { File, Folder }
// })
new Vue({
  el: '#app',
  template: `<div style="width: 500px;">
                <template v-for="r in root">
                  <TreeMenu v-bind="{root: r, parentPath: 'root'}"/>
                </template>
             </div>`,
  data: {
    root: TestFile
  },
  components: { TreeMenu }
})
// new Vue({
//   el: '#app',
//   // template: '<test/>',
//   // store,
//   // components: { test }
//   render: h => h(test)
// })