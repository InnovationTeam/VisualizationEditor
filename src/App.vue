<template>
	<div>
		<menu-bar id="menu-bar"></menu-bar>
		<div class="box">

		</div>
		<!-- <el-container style="height: 800px;width: 100%; border: 1px solid #eee"> -->
			<!-- 左侧常用功能 -->
			<!-- <left-bar></left-bar> -->
			<!-- <el-container style="background-color: #3C3C3C"> -->
				<!-- <el-header style="text-align: left; height:30px; font-size: 12px"> -->
	        <!-- 资源管理器 -->
				<!-- </el-header> -->
	      <!-- <drop-down message="打开的编辑器" container="editContainer"></drop-down> -->
				<!-- <drop-down message="文件夹" container="documentContainer"></drop-down> -->
			<!-- </el-container> -->
				<!-- <el-container> -->
			<!-- <editor></editor> -->
		<!-- </el-container> -->
		<!-- </el-container> -->

	
	</div>
</template>
<script>
import LeftBar from './components/LeftBar'
import DropDown from './components/DropDown'
import MenuBar from './components/MenuBar'
import Editor_js from './components/Editor_js'

export default {
  data () {
    return {
			active: false
    }
  },
  components: {
		'left-bar': LeftBar,
		'drop-down': DropDown,
		'menu-bar': MenuBar,
		'editor': Editor_js
  },
	methods: {
		show: function(){
			active = !active;
		}
	}
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	#menu-bar {
        position: absolute;
        z-index: 2;
    }
    
    .box {
            position: absolute;
            left: 0;
            top: 30px;
            width: 100%;
            height: 100%;
            background: #3f4760;
            background: -webkit-linear-gradient(top, #3f4760 0%, #1a223f 100%);
            background: linear-gradient(to bottom, #3f4760 0%, #1a223f 100%);
            z-index: 0;
        }

	.el-header {
		background-color: #2B2B2B;
		color: #dddddd;
		line-height: 30px;
	}
  
  .el-submenu {
    height: 30px;
    background-color: #555555;
  }

	.el-aside {
		color: #333;
	}

	.editContainer{
		height: 100px;
		width: 100%;
	}

	.documentContainer{
		height: 100px;
		width: 100%;
	}
</style>
