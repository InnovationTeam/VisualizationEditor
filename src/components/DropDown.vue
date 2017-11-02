<template>
    <div class="header_menu">
        <div @click="show">
            <i :class="[active?'el-icon-arrow-down':'el-icon-arrow-right']"></i>{{message}}
        </div>
        <div v-show="active" :class="container">
			<template v-if="container === 'documentContainer'">
                 <template v-for="r in root">
                    <file-tree v-bind="{root: r, parentPath: 'root'}"/>
                </template>
			</template>
        </div>
    </div>
</template>


<script>
import TreeMenu from './TreeMenu'
import TestFile from '../assets/test-tree.json'

export default {
    name: 'dropDown',
    props: ['message', 'container'],
    data () {
        return {
            active: false,
		    root: TestFile
        }
    },
    methods: {
        show: function(){
            this.active = !this.active;
        }
    },
    components:{
	    'file-tree': TreeMenu
    }
}
</script>

<style scoped>
.header_menu{
	text-align: left;
	background-color: #555555;
	width: 100%;
	height: 20px;
	font-size: 12px;
}
</style>