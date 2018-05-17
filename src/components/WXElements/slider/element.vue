<template>
    <div :class="['wx-slider']" :data-wx-element-id="id">
        <input type="range" :value="value" :disabled="cfgData.disabled">
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
        value(){
            return parseInt(this.cfgData.value);
        }
    },
    mounted(){
        $.fn.RangeSlider = function(cfg){
            this.sliderCfg = {
                min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null, 
                max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
                step: cfg && Number(cfg.step) ? cfg.step : 1,
                callback: cfg && cfg.callback ? cfg.callback : null
            };

            var $input = $(this);
            var min = this.sliderCfg.min;
            var max = this.sliderCfg.max;
            var step = this.sliderCfg.step;
            var callback = this.sliderCfg.callback;

            $input.attr('min', min)
                .attr('max', max)
                .attr('step', step);

            $input.bind("input", function(e){
                $input.attr('value', this.value);
                $input.css( 'background-size', this.value + '% 100%' ); 

                if ($.isFunction(callback)) {
                    callback(this);
                }
            });
        };

        var myMin = parseInt(this.cfgData.min);
        var myMax = parseInt(this.cfgData.max);
        var myStep = parseInt(this.cfgData.step);

        $('input').RangeSlider({ min: myMin,   max: myMax,  step: myStep});
    }
}



</script>

<style lang="scss">
.wx-slider{
    display: inline-block;
}

    
input[type=range] {
    -webkit-appearance: none;
    width: 300px;
    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
    background: -webkit-linear-gradient(#1AAD19, #1AAD19) no-repeat;
    background-size: 0% 100%;
}
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
} 
input[type=range]::-webkit-slider-runnable-track {
    height: 3px;
    border-radius: 10px; /*将轨道设为圆角的*/
    box-shadow: 0 0.5px 0.5px #def3f8, inset 0 .1em .1em #E1DDDD;
}
input[type=range]:focus {
    outline: none;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 30px;
    width: 30px;
    margin-top: -14px; /*使滑块超出轨道部分的偏移量相等*/
    background: #ffffff; 
    border-radius: 50%; /*外观设置为圆形*/
    border: solid 1px #E1DDDD; /*设置边框*/
    box-shadow: 1px 1px 2px #CCC8C8; /*添加底部阴影*/
}



</style>

