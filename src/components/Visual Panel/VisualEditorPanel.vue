<template>
    <div class="visual-editor-panel">
        <element-panel></element-panel>
        <display-panel></display-panel>
    </div>
</template>

<script>
import ElementPanel from './ElementPanel'
import DisplayPanel from './DisplayPanel'

export default {
    components: {
        'element-panel': ElementPanel,
        'display-panel': DisplayPanel
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
