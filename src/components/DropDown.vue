<template>
    <div class="header_menu">
        <div @click="show">
            <i :class="[active?'el-icon-arrow-down':'el-icon-arrow-right']"></i>{{message}}
        </div>

        <div v-show="active" :class="container">

        </div>
    </div>
</template>


<script>
    export default {
        name: 'dropDown',
        props: ['message', 'container'],
        data () {
            return {
                active: false
            }
        },
        methods: {
            show: function(){
                this.active = !this.active;
            }
        }
    }
</script>

<style>
    .header_menu{
		text-align: left;
		background-color: #555555;
		width: 100%;
		height: 20px;
		font-size: 12px;
	}
</style>