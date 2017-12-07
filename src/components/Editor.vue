<template>
    <div>
        <editor-model id="editor" :content="content" :theme="theme" :lang="lang" :options="options" 
             @copy="copy" @paste="paste"> </editor-model>
    </div>
</template>

<script>
    import EditorModel from './EditorModel'

    export default {
        name: 'editor',

        components: { EditorModel },

        data () {
            return {
                // 设置编辑区组件的属性
                content: '',
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
            }
        },
        mounted() {
            var vm = this;

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
