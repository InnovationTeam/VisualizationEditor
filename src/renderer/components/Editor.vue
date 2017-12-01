<template>
  <div>
        <editor-model :content="content" :theme="theme" :lang="lang" :options="options" 
            @change="change" @copy="copy" @paste="paste"> </editor-model>
        <button @click="openfile">openfile</button>
        <button @click="savefile">savefile</button>
  </div>
</template>

<script>
  import EditorModel from './Editor/EditorModel'
  import {undo} from '../../api/common/undo'

  export default {
    name: 'editor',

    components: { EditorModel },
    
    data () {
        return {
            // 设置编辑区组件的属性
            filePath:'',
            content: '',
            lang: 'javascript',
            theme: "monokai",
            options: {
                enableBasicAutocompletion: true,
                enableSnippets: true,
                enableLiveAutocompletion: true
            },

            // 用于保存编辑区的代码
            code: ''
        }
    },
    // 设置监听函数
    watch: {
        'lang': function() {
            // console.log(this.lang);
        }
    },
    mounted() {
        var vm = this;

    },
    methods: {
        openfile(){

        },
        savefile(){},
        
        undo(){
            undo(this);
        },
        getValue() {
            this.code = this.$children[0].getValue();
        },
        change(content) {
            console.log(content);
        },
        copy(str) {
            console.log(str);
        },
        paste() {
            console.log('paste');
        }
    }
  }
</script>


<style>

</style>
