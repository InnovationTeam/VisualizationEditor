<template>
    <div class="hierarchy-panel">
        <div class="hierarchy-bar">
        </div>
        <Hierarchy :children="children"></Hierarchy>
    </div>
</template>

<script>
export default {
    data() {
        return {
            children: this.$store.getters['ElementControl/getMainChildrenIDs']
        }
    }
}
</script>

<style lang="scss" scoped>
.hierarchy-panel {
    overflow: hidden;
    height: inherit;
    background-color: #f9f9f9;
}
</style>
