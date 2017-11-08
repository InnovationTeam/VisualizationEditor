<template>
  <div >

    <div>
      <!-- <menu-bar></menu-bar> -->
      <el-container style="height: 800px;width: 1100px; border: 2px solid #eee">
        <!-- 左侧常用功能 -->
        <left-bar></left-bar>
        <div style="background-color: #3C3C3C;width:150px;">
          <el-header style="text-align: left; height:30px; font-size: 12px">
            资源管理器
          </el-header>
          <drop-down message="打开的编辑器" container="editContainer"></drop-down>
          <drop-down message="文件夹" container="documentContainer"></drop-down>
        </div>
        <editor></editor>
      </el-container>

	  </div>

  </div>
</template>

<script>
import LeftBar from './components/LeftBar'
import DropDown from './components/DropDown'
import MenuBar from './components/MenuBar'
import Editor_js from './components/Editor_js'

  export default {
    name: 'my-project',
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

<style>
  /* CSS */
</style>
