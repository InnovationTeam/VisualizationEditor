<template>
  <div id="editor_js">

    <div @contextmenu="showMenu" style="width: 900px;height: 500px;">
    <editor ref="editor1" :content="variable" :width="'100%'" :ext="'language_tools'" :height="'800px'" :lang="'javascript'" :sync='true' :theme="'monokai'" :options="options"></editor>
    <button @click="load">openfile</button>
    <button @click="save">savefile</button>
    <vue-context-menu :contextMenuData="contextMenuData"
	                  @savedata="savedata"
	                  @newdata="testACE">
    </vue-context-menu></div>
  </div>
</template>

<script>
import editor from 'vue2-ace'
import 'brace/mode/javascript'
import 'brace/theme/eclipse'

import 'brace/theme/monokai'
import {loadFile2} from '../../API/File/openFile.js'
import {saveFile} from '../../API/File/saveFile.js'
export default {
  
   data () {
      return {
         variable:'',
         filePath:"",
         options: {
         fontSize: '15pt'
         },
        msg :'Test Ace-Menu',
      	// contextmenu data (菜单数据)
        contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
          menuName: 'demo',
        // The coordinates of the display(菜单显示的位置)
          axios: {
            x: null,
            y: null
          },
        // Menu options (菜单选项)
          menulists:[
            {
              fnHandler: 'savedata', // Binding events(绑定事件)
              icoName: 'fa fa-home fa-fw', // icon (icon图标 )
              btnName: '转到定义' // The name of the menu option (菜单名称)
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '预览定义'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '重命名变量'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '修改所有出现的单词'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '设置文档格式'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '剪切'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '复制'
            },
            {
              fnHandler: 'newdata',
              icoName: 'fa fa-home fa-fw',
              btnName: '粘贴'
            },
          ]
        }
      }
    },
    components: {
        editor
    },
    methods: {
      load:function(){
        var result=loadFile2();
        this.variable=result.content;
        this.filePath=result.path;

      },
      save:function(){
        saveFile(this);
      },
      testACE (str) {
        //  console.log(str)
      },
      showMenu () {
        event.preventDefault()
        var x = event.clientX
        var y = event.clientY
        // Get the current location
        this.contextMenuData.axios = {
          x, y
        }
      },
      savedata () {
      	alert(1)
      },
      newdata () {
      	console.log('newdata!')
      }
    },
    mounted () {
    //   var self = this;
    //   self.$on('editor-update', self.testACE);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
