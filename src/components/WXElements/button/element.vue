<template>
    <div :class="['wx-button', classList]" :data-wx-element-id="id" :data-plain="cfgData.plain" :data-disabled="cfgData.disabled">
        <template v-if="cfgData.loading">
            <img draggable="false" src="static/images/loading.gif" :data-wx-element-id="id">
        </template>
        {{ cfgData.text }}
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
        classList() {
            return [
                'button-type-' + this.attributes.type.validValue[this.cfgData.type],
                'button-size-' + this.attributes.size.validValue[this.cfgData.size]
            ]
        }
    },
    methods:{
        creat(){

        }
    }
}
</script>

<style lang="scss">
.wx-button{
    border-radius:5px;
    text-align: center;
    text-decoration: none;

    &[data-disabled="true"] {
        opacity:0.4;
    }

    &.button-type- {
        &default {
            border: 1px solid #D7D7D7;
            background-color: #f8f8f8;
            color: rgb(49, 44, 44);

            &[data-plain="true"] {
                background-color: white;
                color: rgb(49, 44, 44);
                border-color: rgb(49, 44, 44);
            }
        }
        &primary{
            border: 1px solid #286F2B;
            background-color: #1AAD19;
            color: white;

            &[data-plain="true"] {
                background-color: white;
                color: #1AAD19;
            }
        }
        &warn{
            border: 1px solid #841B1C;
            background-color: #E64340;
            color: white;

            &[data-plain="true"] {
                background-color: white;
                color: #E64340;
            }
        }
    }

    &.button-size- {
        &default{
            width: 100%;
            min-height:43px;
            line-height: 43px;
            font-size: 18px;

            & > img {
                height: 15px;
                padding-right: 3px;
            }
        }
        &mini{
            display: inline-block;
            min-width:65px;
            min-height:30px;
            font-size: 14px;
            line-height: 30px;

            & > img {
                height: 10px;
                padding-right: 1px;
            }
        }
    }
    
}
</style>

