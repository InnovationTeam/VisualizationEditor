<template>
    <component :is="'wx-' + childData.tagName" v-bind="{cfgData: childData.cfgData, id: childData.id}" :key="childData.id">
        <template v-if="childChildren && childChildren.length">
            <template v-for="id in childChildren">
                <ElementRenderer :childID="id" :key="id"></ElementRenderer>
            </template>
        </template>
    </component>
</template>

<script>

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
    }
}
</script>