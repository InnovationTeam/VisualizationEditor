<template>
    <div :class="['wx-input', cfgData.domClass]" :data-wx-element-id="id">
        <input :type="dataType" :placeholder="cfgData.placeholder" :value="cfgData.value" :data-wx-element-id="id">
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
    },
    computed: {
        dataType(){
            if(this.cfgData.password){
                console.log('password');
                return "password";
            }else{
                return this.attributes.type.validValue[this.cfgData.type];
            }
        }

    }
}
</script>

<style lang="scss">
.wx-input{
    border: none;
	outline: none; 
}
</style>

