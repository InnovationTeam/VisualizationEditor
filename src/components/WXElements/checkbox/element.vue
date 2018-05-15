<template>
    <div :class="['wx-checkbox']" :data-wx-element-id="id">
        <input type="checkbox" :id="id" :value="cfgData.value" :disabled="cfgData.disabled" :checked="cfgData.checked" style="display:none;">
        <label :for="id" :class="['checkbox-like']">✔</label>
        <span>{{ cfgData.text }}</span>
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
.wx-checkbox{
    display: inline-block;
    
    & > input:checked + label {
        color: #1AAD19;
    }
}
.checkbox-like{
    background-color: #ffffff;
    border: 1px solid #E8E8E8;
    padding: 1px 6px;
    border-radius: 3px;
    vertical-align: middle;
    text-align:center;
    color:#ffffff;
}
</style>

