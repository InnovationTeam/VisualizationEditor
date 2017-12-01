import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      // 为什么这里又是require？
      // require适合动态加载，因为LandingPage文件通过export default导出default对象，所以需要加上.default
      // 而使用import默认加载default对象
      // @用于在打包时替换成打包后的路径
      component: require('@/components/Editor').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
