<template>
    <div :class="['wx-progress', cfgData.domClass]" :style="styleObject1" :data-wx-element-id="id">
        <span :style="styleObject2" :data-wx-element-id="id"></span>
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
    computed:{
        styleObject1(){
            var styleObject = new Object();
            var strokeWidth = parseFloat(this.cfgData.strokeWidth);

            styleObject['height'] = strokeWidth + 'px';
            return styleObject;
        },
        styleObject2(){
            var styleObject2 = new Object();
            
            var percent = this.cfgData.percent;
            var strokeWidth = parseFloat(this.cfgData.strokeWidth);

            styleObject2['height'] = strokeWidth + 'px';
            styleObject2['width'] = percent;

            return styleObject2;
        }
    }
}
</script>

<style lang="scss">
.wx-progress{
    width:100%;
	background: #ebebeb;
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
    
    & > span{
        position: relative;
        float: left;
        margin: 0 -1px;
        text-align: right;
        background: #1AAD19;
    }
}

</style>

