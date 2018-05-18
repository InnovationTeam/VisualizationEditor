<template>
    <div class="element-panel scrollable-y">
        <template v-for="(elementData, elementName) in elements">
            <element-item 
                v-bind="{elementName: elementName.toLowerCase(), attributes: elementData.attributes, prebuilts: elementData.prebuilts}"
                :key="elementName">
                <template slot="element-preview" slot-scope="{ cfgData }">
                        <component :is="'wx-' + elementName.toLowerCase()" :cfgData="cfgData"
                            draggable="true" @dragstart.native="DragStart($event, elementName.toLowerCase(), cfgData)">
                        </component>
                </template>
            </element-item>
        </template>
    </div>
</template>

<script>
import ElementItem from './ElementItem'
import WXElements from '@/components/WXElements'

export default {
    data() {
        return {
            elements: WXElements
        }
    },
    methods: {
        DragStart(e, tagName, cfgData) {
            e.dataTransfer.setData('text', 'addElement')
            e.dataTransfer.setData('application/json', JSON.stringify({
                tagName: tagName,
                cfgData: cfgData
            }))
        }
    },
    components: {
        'element-item': ElementItem,
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/common/scrollbar';

.element-panel {
    float: left;
    width: 300px;
    height: inherit;
    background-color: #f9f9f9;
}
</style>
