<template>
    <div>
        <div id="tab-list">
            <tab></tab>
            <tab></tab>
            <tab></tab>
            <tab></tab>
            <tab></tab>
        </div>
        <div id="tab-content">
            <editor class="editor"></editor>
        </div>
    </div>
</template>

<script>
import Editor from './Editor'
import ClosableTab from './ClosableTab'

export default {
    components: {
        'tab': ClosableTab,
        'editor': Editor
    }
}
</script>

<style lang="scss" scoped>
$tab-list-height: 30px;

.editor {
    width: 100%;
    height: 100%;
}

#tab-list {
    height: $tab-list-height;
    width: 100%;
    margin: 0;
    padding: 0;
}


#tab-content {
    position: absolute;
    top: $tab-list-height;
    bottom: 0;
    width: 100%;
}
</style>
