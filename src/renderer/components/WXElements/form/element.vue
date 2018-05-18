<template>
    <div :class="['wx-form', cfgData.domClass]" :data-wx-element-id="id">
        <form :data-wx-element-id="id"></form>
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

