<template>
    <div>
        <div id="tab-list">
            <template v-for="file in openedFilesInfo">
                <tab v-bind="{ fileName: file.name, isTemp: file.id === temp, isActive: file.id === active }" 
                :key="file.id" @click.native="activeTab(file.id)">
                    <span slot="close-file-icon" @click.stop="closeFile(file.id)"><icon :iconType="'close_file'" /></span>
                </tab>
            </template>
        </div>
        <div id="tab-content">
            <!-- <keep-alive :include="[]">
                <component :is="active"></component>
            </keep-alive> -->
            <template v-for="id in openedIDs">
                <editor v-show="id === active" class="editor" v-bind="{content: getContent(id)}" :key="'editor-' + id"></editor>
            </template>
        </div>
    </div>
</template>

<script>
import Icon from './common/Icon'
import Editor from './Editor'
import ClosableTab from './ClosableTab'
import Vue from 'vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('FileControl')

export default {
    computed: {
        ...mapGetters({
            openedFilesInfo: 'getOpenedFiles',
            openedIDs: 'getOpenedIDs',
            temp: 'getTempID',
            active: 'getActiveID'
        }),
        activeEditor() {
            return this.active === '' ? '' : this.editors[this.active]
        }
    },
    methods: {
        getContent(id) {
            return this.$store.getters['FileControl/getContentByID'](id)
        },
        closeFile(id) {
            this.$store.commit('FileControl/CLOSE_FILE', {id})
        },
        activeTab(id) {
            this.$store.commit('FileControl/ACTIVE_FILE', {id})
        }
    },
    components: {
        'tab': ClosableTab,
        'editor': Editor,
        'icon': Icon
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
