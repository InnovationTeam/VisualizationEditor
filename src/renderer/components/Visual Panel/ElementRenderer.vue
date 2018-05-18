<template>
    <component :is="'wx-' + childData.tagName" v-bind="{cfgData: childData.cfgData, id: childData.id}" :key="childData.id"
        draggable="true" @dragstart.native.stop="DragStart($event, childData)" @click.native.stop="SelectElement" @keyup.delete="Delete">
        <template v-if="childChildren && childChildren.length">
            <template v-for="id in childChildren">
                <ElementRenderer :childID="id" :key="id"></ElementRenderer>
            </template>
        </template>
    </component>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('ElementControl')

export default {
    name: 'ElementRenderer',
    props: {
        childID: String
    },
    data() {
        return {
            childData: this.$store.getters['ElementControl/getInfoByID'](this.childID),
            childChildren: this.$store.getters['ElementControl/getChildrenByID'](this.childID)
        }
    },
    methods: {
        ...mapMutations({
            focusElement: 'FOCUS_ELEMENT'
        }),
        DragStart(e, childData) {
            e.dataTransfer.setData('text', 'moveElement')
            e.dataTransfer.setData('application/json', JSON.stringify({
                fatherID: childData.fatherID,
                movingElementID: childData.id
            }))
        },
        SelectElement() {
            if(document.getElementsByClassName('current-focus-element')[0] !== undefined){
                document.getElementsByClassName('current-focus-element')[0].classList.remove('current-focus-element')
            }
            this.$el.classList.add('current-focus-element')
            this.$el.focus()
            this.focusElement({
                elementID: this.childID
            })
        },
        Delete() {
            console.log('delete')
        }
    }
}
</script>

<style lang="scss">
.current-focus-element {
    border: 2px solid rgba(0, 67, 255, 0.21) !important;
}
</style>
