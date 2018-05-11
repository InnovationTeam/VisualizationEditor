<template>
    <div class="element-panel scrollable-y">
        <template v-for="(elementData, elementName) in elements">
            <element-item 
                :elementName="elementName" 
                :attributes="elementData.attributes" 
                :prebuilts="elementData.prebuilts" 
                :key="elementName">
                <template slot="element-preview" slot-scope="{ cfgData }">
                    <div draggable="true" @dragstart="DragStart($event)">
                        <component :is="'wx-' + elementName" :cfgData="cfgData"></component>
                    </div>
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
        DragStart(e) {
            e.dataTransfer.setData('text/html', e.target.outerHTML)
            console.log(e.dataTransfer.getData('text/html'))
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
    background-color: white;
}
</style>
