<template>
    <div :class="['wx-image', cfgData.domClass]" :data-wx-element-id="id">
        <img :src="cfgData.src" style="width:300px;height:225px" :data-wx-element-id="id">
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

