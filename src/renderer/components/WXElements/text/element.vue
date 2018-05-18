<template>
    <div :class="['wx-text', cfgData.domClass]" :data-wx-element-id="id">
        <span :data-wx-element-id="id">{{ cfgData.text }}</span>
        <slot></slot>
    </div>
</template>

<script>
import elementAttributeData from './attributes.json'
export default {
    props: {
        cfgData: Object,
        id: {
            default: ''
        }
    },
    data() {
        return {
            attributes: elementAttributeData
        }
    }
}
</script>

<style lang="scss">

</style>

