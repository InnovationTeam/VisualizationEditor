<template>
	<el-container style="height: 800px;width: 250px; border: 1px solid #eee">
		<!-- 左侧常用功能 -->
		<left-bar></left-bar>
		
		<el-container style="background-color: #3C3C3C">
			<el-header style="text-align: left; height:30px; font-size: 12px">
        资源管理器
			</el-header>
			
      <drop-down message="打开的编辑器" container="editContainer"></drop-down>
			<drop-down message="文件夹" container="documentContainer"></drop-down>
		</el-container>
	</el-container>
</template>

<script>
import LeftBar from './components/LeftBar'
import DropDown from './components/DropDown'


export default {
  data () {
    return {
			active: false
    }
  },
  components: {
		'left-bar': LeftBar,
		'drop-down': DropDown
  },
	methods: {
		show: function(){
			active = !active;
		}
	}
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
