<template>
	<div>
		<div class="background"></div>
		<left-panel id="left-panel">

		</left-panel>

		<menu-bar id="menu-bar">
			<span slot="current-file">test.css</span>
		</menu-bar>
        <side-bar id="side-bar" />
		<status-bar id="status-bar" />
		
		<!-- <el-container style="height: 800px;width: 100%; border: 1px solid #eee"> -->
			<!-- 左侧常用功能 -->
			<!-- <side-bar></side-bar> -->
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
import MenuBar from './components/MenuBar'
import SideBar from './components/SideBar'
import StatusBar from './components/StatusBar'

import LeftPanel from './components/LeftPanel'

import DropDown from './components/DropDown'
import Editor_js from './components/Editor_js'

export default {
  data () {
    return {
		active: false
    }
  },
  components: {
		'menu-bar': MenuBar,
		'side-bar': SideBar,
		'status-bar': StatusBar,
		'left-panel': LeftPanel,
		'drop-down': DropDown,
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
$menu-bar-height: 30px;
$status-bar-height: 25px;

#menu-bar {
    position: absolute;
    z-index: 3;
}

#side-bar {
	position: absolute;
    z-index: 2;
    top: $menu-bar-height;
    bottom: 0;
}

#status-bar {
	position: absolute;
	z-index: 1;
	bottom: 0;
}

#left-panel {
	position: absolute;
	z-index: 0;
	top: $menu-bar-height + 1px;
	bottom: $status-bar-height + 1px;
}

.background {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: #3f4760;
    background: -webkit-linear-gradient(top, #3f4760 0%, #1a223f 100%);
    background: linear-gradient(to bottom, #3f4760 0%, #1a223f 100%);
    z-index: -1;
    font-size: 5em;
}

// 	.el-header {
// 		background-color: #2B2B2B;
// 		color: #dddddd;
// 		line-height: 30px;
// 	}
  
//   .el-submenu {
//     height: 30px;
//     background-color: #555555;
//   }

// 	.el-aside {
// 		color: #333;
// 	}

// 	.editContainer{
// 		height: 100px;
// 		width: 100%;
// 	}

// 	.documentContainer{
// 		height: 100px;
// 		width: 100%;
// 	}
</style>
