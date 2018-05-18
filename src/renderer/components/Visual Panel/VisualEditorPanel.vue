<template>
    <div class="visual-editor-panel">
        <element-panel></element-panel>
        <display-panel></display-panel>
        <style-panel></style-panel>
        <hierarchy-panel></hierarchy-panel>
    </div>
</template>

<script>
import ElementPanel from './ElementPanel'
import DisplayPanel from './DisplayPanel'
import StylePanel from './StylePanel'
import HierarchyPanel from './HierarchyPanel'

export default {
    components: {
        'element-panel': ElementPanel,
        'display-panel': DisplayPanel,
        'style-panel': StylePanel,
        'hierarchy-panel': HierarchyPanel,
    }
}
</script>

<style lang="scss" scoped>
.visual-editor-panel {
    background-color: black;
    height: 100%;
    user-select: none;
}
</style>
