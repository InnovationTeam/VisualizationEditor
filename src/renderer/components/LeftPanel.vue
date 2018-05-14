<template>
    <div id="left-panel">
            <input id="rootFolder" type="checkbox">
            <label for="rootFolder">{{ haveOpenedFolder ? rootName.toUpperCase() : '无打开的文件夹' }}</label>
            <div class="children">
                <template v-if="!haveOpenedFolder">
                    <button @click="openFolder">打开文件夹</button>
                </template>
                <template v-else v-for="child in rootChildren">
                    <file-tree v-bind="{currItem: child, parentPath: ''}" :key="child.id"/>
                </template>
            </div>
    </div>
</template>


<script>
import Icon from './common/Icon'
import TreeMenu from './TreeMenu'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('FileControl')

export default {
    computed: {
        ...mapGetters({
            rootName: 'getRootName',
            rootPath: 'getRootPath',
            rootChildren: 'getRootChildren'
        }),
        haveOpenedFolder() {
            return this.rootName !== ''
        }
    },
    methods: {
        ...mapMutations({
            openFolder: 'OPEN_FOLDER'
        })
    },
    components: {
        'file-tree': TreeMenu
    }
}
</script>

<style lang="scss" scoped>
#left-panel {
    background: #2A3047;
    background: -webkit-linear-gradient(top, #2A3047 0%,#171e32 100%);
    background: linear-gradient(to bottom, #2A3047 0%, #171e32 100%);
    font: {
        family: 'Consolas', 'Microsoft YaHei';
        size: 14px;
    }
    color: #80849a;
    user-select: none;    

    & #left-panel-content {
        margin: {
            top: 5px;
            left: 10px;
        }
    }
}

input {
    &[type="checkbox"]{
        display: none;
    }
    &:checked~.children{
        display: block;
    }
}

.children{
    display: none;
    margin-left: 20px;
}

</style>