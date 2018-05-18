<template>
    <div :class="['wx-navigator', cfgData.domClass]" :data-wx-element-id="id">
        <div :data-wx-element-id="id"></div>
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

