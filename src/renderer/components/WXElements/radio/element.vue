<template>
    <div :class="['wx-radio', cfgData.domClass]" :data-wx-element-id="id">
        <input type="radio" :id="id" :name="cfgData.name" :value="cfgData.value" :disabled="cfgData.disabled" :checked="cfgData.checked" style="display:none;" :data-wx-element-id="id">
        <label :for="id" :class="['radio-like']" :data-wx-element-id="id">✔</label>
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
.wx-radio{
    display: inline-block;
    
    & > input:checked + label {
        background-color: #1AAD19;
	border: none;
    }
}
.radio-like{
    background-color: #ffffff;
    border: 1px solid #E8E8E8;
	padding: 0 5px;
    border-radius: 30px;
    vertical-align: middle;
	text-align:center;
	color:#ffffff;
}
</style>

