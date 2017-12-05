<template>
    <div id="left-panel">
        <template v-for="r in root">
            <file-tree v-bind="{currItem: r, parentPath: currPath}" :key="currPath + '\\' + r.name"/>
        </template>
    </div>
</template>


<script>
import Icon from './common/Icon'
import TreeMenu from './TreeMenu'
import TestFile from '../assets/test-tree.json'

export default {
    data () {
       
        return {
            currPath: 'root',
            root: TestFile
        }
    },
    computed: {
        
    },
    components: {
        'file-tree': TreeMenu
    },
    mounted() {    
        
    }
}
</script>

<style lang="scss" scoped>
#left-panel {
    background: #2A3047;
    background: -webkit-linear-gradient(top, #2A3047 0%,#171e32 100%);
    background: linear-gradient(to bottom, #2A3047 0%, #171e32 100%);
    font: {
        family: 'Consolas';
        size: 14px;
    }
    color: #80849a;
    user-select: none;
    padding: {
        top: 5px;
        left: 10px;
    }
    
}

</style>