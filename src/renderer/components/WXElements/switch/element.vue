<template>
    <div :class="['wx-switch', cfgData.domClass]" :data-wx-element-id="id">
        <label :data-wx-element-id="id">
            <input type="checkbox" :class="['switch-like']" @click.self.prevent :checked="cfgData.checked" :data-wx-element-id="id">
        </label>
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
.wx-switch{
    display: inline-block;
}
.switch-like{
    width: 52px;
	height: 31px;
	position: relative;
	border: 1px solid #dfdfdf;
	background-color: #fdfdfd;
	box-shadow: #dfdfdf 0 0 0 0 inset;
	border-radius: 20px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
	background-clip: content-box;
	display: inline-block;
	-webkit-appearance: none;
	user-select: none;
	outline: none; 
	/*过渡效果*/
	transition: background-color ease 0.4s; 

    &:before{
        content: '';
        width: 29px;
        height: 29px;
        position: absolute;
        top: 0px;
        left: 0;
        border-radius: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        background-color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); 
        /*过渡效果*/
        transition: left 0.3s; 
    }

    &:checked{
        border-color: #64bd63;
        box-shadow: #64bd63 0 0 0 16px inset;
        background-color: #64bd63; 
        /*过渡效果*/
        box-shadow: #dfdfdf 0 0 0 0 inset;
        background-color: #64bd63;
        transition: border-color 0.4s, background-color ease 0.4s;


        &:before{
            left: 21px;
            /*过渡效果*/
            transition: left 0.3s; 
        } 
    }


}



</style>

