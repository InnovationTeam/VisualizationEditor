<template>
    <div>
        <template v-if="isFolder">
            <input :id="ID" type="checkbox">
            <label :for="ID">
                <Folder v-bind="{folderName: name}"/>
            </label>
            <div class="children">
                <template v-for="child in root.children">
                    <TreeMenu v-bind="{root: child, parentPath: ID}" />
                </template>
            </div>
        </template>
        <template v-else>
            <File v-bind="{fileName: name}"/>
        </template>
    </div>
</template>

<script>
import File from './File'
import Folder from './Folder'

import FILES from '../assets/test-tree.json'

export default {
    name: 'TreeMenu',
    props: {
        root: Object,
        parentPath: String
    },
    data() {
        return {
            ID: this.parentPath + '/' + this.root.name,
            name: this.root.name 
        }
    },
    methods: {
        
    },
    computed:{
        isFolder() {
            return this.root.children !== undefined
        }
    },
     directives: {
        focus: {
            inserted(el, {value}) {
                el.focus()
                let index = value.lastIndexOf('.')
                el.setSelectionRange(0, index > 0 ? index : -1)
            }
        },
        enter: {
            inserted(el, {value}) {
                if(value) {
                    el.blur()
                }
            }
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
