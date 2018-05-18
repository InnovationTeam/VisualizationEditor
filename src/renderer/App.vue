<template>
	<div>
		<menu-bar id="menu-bar">
			<span slot="current-file">{{ activeFile }}</span>
		</menu-bar>

        <side-bar id="side-bar" />

		<left-panel id="left-panel" ref="leftPanel" :style="{width: leftPanelWidth + 'px'}"></left-panel>

		<div class="col-resize" @mousedown="resizePanel_left_editor($event)" 
			:style="{left: resizeLeft + 'px', width: resizeWidth + 'px'}"></div>

		<div id="editor-panel" ref="editorPanel" :style="{left: leftPanelWidth + 'px'}">
			<code-editor-panel v-if="showCodeEditorPanel"></code-editor-panel>
			<visual-editor-panel v-if="showVisualEditorPanel"></visual-editor-panel>
		</div>

		<status-bar id="status-bar" />		
	</div>
</template>
<script>
import MenuBar from './components/MenuBar'
import SideBar from './components/SideBar'
import StatusBar from './components/StatusBar'

import LeftPanel from './components/LeftPanel'
import CodeEditorPanel from './components/EditorPanel'
import VisualEditorPanel from './components/Visual Panel/VisualEditorPanel'
// import Editor from './components/Editor'

export default {
	data () {
		return {
			leftPanelWidth: 300,
			resizeWidth: 10
    	}
	},
	computed:{
		activeFile() {
			let file = this.$store.getters['FileControl/getActiveFile']
			return file === undefined ? '未打开文件' : file.name
		},
		resizeLeft(){
			return this.leftPanelWidth - this.resizeWidth / 2
		},
		editorPanelLeft(){
			return this.leftPanelWidth
		},
		showCodeEditorPanel() {
			return this.$store.state.useCodeEditor
		},
		showVisualEditorPanel() {
			return this.$store.state.useVisualEditor
		}
	},
  	components: {
		'menu-bar': MenuBar,
		'side-bar': SideBar,
		'status-bar': StatusBar,
		'left-panel': LeftPanel,
		'code-editor-panel': CodeEditorPanel,
		'visual-editor-panel': VisualEditorPanel
		// 'editor': Editor
  	},
	methods: {
		resizePanel_left_editor(event){
			if(event.button === 0){
				let startX = event.clientX
				let minWidth = 200
				let maxWidth = window.innerWidth - minWidth

				document.onmousemove = (event) => {
					event.preventDefault()
					if(event.clientX >= minWidth && event.clientX <= maxWidth){
						let moveX = event.clientX - startX
						startX = event.clientX

						let temp = this.leftPanelWidth + moveX
						this.leftPanelWidth = temp < minWidth ? minWidth : (temp > maxWidth ? maxWidth : temp)
					} else if(event.clientX < minWidth) {
						this.leftPanelWidth = minWidth
					} else {
						this.leftPanelWidth = maxWidth
					}
				}

				document.onmouseup = () => {
					document.onmousemove = null
				}
			}
			
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
	z-index: -2;
	top: $menu-bar-height;
	bottom: $status-bar-height;
}

#editor-panel {
    position: absolute;
	right: 0;
	top: $menu-bar-height;
	bottom: $status-bar-height;
    background: #3f4760;
    background: -webkit-linear-gradient(top, #3f4760 0%, #1a223f 100%);
    background: linear-gradient(to bottom, #3f4760 0%, #1a223f 100%);
    z-index: -2;
}

.col-resize {
	background-color: rgba(0,0,0,0);
	display: block;
	cursor: col-resize;
	position: absolute;
	top: $menu-bar-height;
	bottom: $status-bar-height;
    z-index: -1;
}
</style>
