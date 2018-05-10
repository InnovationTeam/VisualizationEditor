// 将Renderer组件设置为全局组件

import RendererComponent from './Renderer'

const Renderer={
    install:function(Vue){
        Vue.component('Renderer',RendererComponent)
    }

}

export default Renderer