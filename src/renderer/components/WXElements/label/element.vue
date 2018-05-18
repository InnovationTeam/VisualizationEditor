<template>
    <div :class="['wx-label', cfgData.domClass]" :data-wx-element-id="id">
        <label :data-wx-element-id="id"></label>
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

