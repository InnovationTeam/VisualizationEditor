<template>
    <div :class="['wx-icon', classList, cfgData.domClass]" :style="styleObject" :data-wx-element-id="id">
        <span :data-wx-element-id="id">{{this.symbol}}</span>
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
            attributes: elementAttributeData,
            symbols:{
                'success': '✔',
                'success_no_circle': '✔',
                'info': 'i',
                'warn': '!',
                'waiting': '┕',
                'cancel': '✖',
                'download': '⇩',
                'clear': '✖',
                'search': '▷' 
            }
        }
    },
    computed: {
        classList() {
            return [
                'icon-type-' + this.attributes.type.validValue[this.cfgData.type]
            ]
        },
        symbol(){
            return this.symbols[this.attributes.type.validValue[this.cfgData.type]];
        },
        styleObject(){
            var styleObject = new Object();
            var size = parseInt(this.cfgData.size);
            
            if(this.attributes.type.validValue[this.cfgData.type] === 'success_no_circle' || this.attributes.type.validValue[this.cfgData.type] === 'search'){
                size = size - 4;
                styleObject['font-size'] = size + 'px';
                styleObject['padding-left'] = 2 + 'px';
                styleObject['padding-right'] = 2 + 'px';
            }else{
                styleObject['width'] = size + 'px';
                styleObject['height'] = size + 'px';
                styleObject['font-size'] = (16 / 23 * size) + 'px';
                styleObject['border-radius'] = size + 'px';
                styleObject['border'] = '0.5px solid';
            }

            return styleObject;

        }
    }
}
</script>

<style lang="scss">
.wx-icon{
    display: inline-block;
	text-align: center;
}

.icon-type- {
    &success {
        background-color: #1AAD19;
        border-color: #1AAD19;
        color: #ffffff;
    }
    &success_no_circle{
        color: #1AAD19;
    }
    &info{
        background-color: #10AEFF;
        border-color: #10AEFF;
        color: #ffffff;
    }
    &warn{
        background-color: #F76260;
        border-color: #F76260;
        color: #ffffff;
    }
    &waiting{
        background-color: #10AEFF;
        border-color: #10AEFF;
        color: #ffffff;
    }
    &cancel{
        background-color: #ffffff;
        color: #F76260;
        border-color: #F76260;
    }
    &download{
        background-color: #1AAD19;
        border-color: #1AAD19;
        color: #ffffff;
    }
    &search{
        color: #B2B2B2;
    }
    &clear{
        background-color: #B2B2B2;
        border-color: #B2B2B2;
        color: #ffffff;
    }

}

</style>

