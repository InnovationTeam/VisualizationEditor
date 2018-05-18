// 将Hierarchy组件设置为全局组件

import HierarchyComponent from './Hierarchy'

const Hierarchy={
    install:function(Vue){
        Vue.component('Hierarchy',HierarchyComponent)
    }

}

export default Hierarchy