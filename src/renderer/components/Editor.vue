<template>
    <div>
        <editor-model id="editor" :content="content" :theme="theme" :lang="lang" :options="options" 
             @copy="copy" @paste="paste"> </editor-model>
    </div>
</template>

<script>
import EditorModel from './EditorModel'
import File from '../../api/File'
import Edit from '../../api/Edit'

export default {
    name: 'editor',
    props: {
        content: String
    },
    components: { EditorModel },

    data() {
        return {
            // 设置编辑区组件的属性
            // content: '',
            filePath:'',
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
        },
        'content': function(val){
            // console.log(val);
            this.$children[0].editor.setValue(val);
            //console.log(this.$children[0].editor.getValue())
        }
    },
    mounted() {
        var vm = this;
        vm.$children[0].editor.getSession().on('change',function(e){
            //可以在这里判断一下自动保存是否被选中
            File.saveFile(vm,vm.$store.getters['FileControl/getActivePath'])
        })
        File.watchFile(vm,vm.$store.getters['FileControl/getActivePath']);
    },
    methods: {
        getValue() {
            this.code = this.$children[0].getValue();
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

<style lang="scss" scoped>
#editor {
    width: 100%;
    height: 100%;
}
</style>
