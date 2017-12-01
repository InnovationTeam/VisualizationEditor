<template>
    <div>
        <template v-if="isFolder">
            <input :id="currPath" type="checkbox">
            <label :for="currPath">
                <Folder v-bind="{folderName: name}"/>
            </label>
            <div class="children">
                <template v-for="child in currItem.children">
                    <TreeMenu v-bind="{currItem: child, parentPath: currPath}" :key="currPath + '\\' + child.name"/>
                </template>
            </div>
        </template>
        <template v-else>
            <span @dblclick="openFile" >
                <File v-bind="{fileName: name}"/>
            </span>
        </template>
    </div>
</template>

<script>
import File from './File'
import Folder from './Folder'

export default {
    name: 'TreeMenu',
    props: {
        currItem: Object,
        parentPath: String
    },
    data() {
        return {
            currPath: this.parentPath + '\\' + this.currItem.name,
            name: this.currItem.name 
        }
    },
    methods: {
        openFile(){
            alert(this.currPath)
        }
    },
    computed:{
        isFolder() {
            return this.currItem.children !== undefined
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
