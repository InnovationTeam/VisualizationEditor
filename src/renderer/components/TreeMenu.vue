<template>
    <div>
        <template v-if="isFolder">
            <input :id="id" type="checkbox">
            <label :for="id">
                <Folder v-bind="{folderName: name, id: id}"/>
            </label>
            <div class="children">
                <template v-for="child in children">
                    <TreeMenu v-bind="{currItem: child, parentPath: currPath}" :key="child.id"/>
                </template>
            </div>
        </template>
        <template v-else>
            <span @click="openTemporarily" @dblclick="openFile" :ref="id">
                <File v-bind="{fileName: name, id: id}"/>
            </span>
        </template>
    </div>
</template>

<script>
import File from './File'
import Folder from './Folder'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('FileControl')


export default {
    name: 'TreeMenu',
    props: {
        currItem: Object,
        parentPath: String
    },                 
    methods: {
        openTemporarily() {
            this.$store.commit('FileControl/OPEN_TEMPORARILY', {
                id: this.currItem.id,
                path: this.$store.getters['FileControl/getRootPath'] + this.currPath
            })
        },
        openFile(){
            this.$store.commit('FileControl/OPEN_FILE', {
                id: this.currItem.id,
                path: this.$store.getters['FileControl/getRootPath'] + this.currPath
            })
        }
    },
    computed:{
        currPath() {
            return this.parentPath + '\\' + this.currItem.name
        },
        id() {
             return this.currItem.id
        },
        name() {
            return this.currItem.name
        },
        children() {
            if(this.isFolder)
                return this.$store.getters['FileControl/getInfoByIDs'](this.currItem.children)
        },
        isFolder() {
            return this.currItem.children !== undefined
        }
    },
    components: {
        File,
        Folder
    }
}
</script>

<style lang="scss" scoped>
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
