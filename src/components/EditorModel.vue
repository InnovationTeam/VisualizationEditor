<template>
    <!-- 预先设置style? -->
    <div id="editor"></div>
</template>

<script>
    // var editor = require('static/jascript/editor')
    // var ace = window.ace;
    // ace.require("ace/ext/language_tools");
    
    // // var editor = ace.edit("editor");
    // console.log(document.getElementById("editor"));
    // var editor = ace.edit(document.getElementById("ace"));
    // //可以在这里直接修改语言
    // editor.session.setMode("ace/mode/javascript");
    // //设置主题
    // editor.setTheme("ace/theme/monokai");

    // // enable autocompletion and snippets
    // editor.setOptions({
    //     enableBasicAutocompletion: true,
    //     enableSnippets: true,
    //     enableLiveAutocompletion: true
    // });
    var ace = window.ace;

    export default {
        name: 'editor-model',
        // 暴露组件需要的属性，并为每个属性设置默认值
        props: {
            // 编辑区的内容
            content: {
                type: String,
                default: ''
            },
            // 设置语言
            lang: {
                type: String,
                default: 'javascript'
            },
            // 设置编辑区的主题
            theme: {
                type: String,
                default: 'monokai'
            },
            sync: {
                type: Boolean,
                default: false
            },
            options: {
                type: Object,
                default: function () { 
                    return {
                        enableBasicAutocompletion: true,
                        enableSnippets: true,
                        enableLiveAutocompletion: true
                    } 
                }
            },
            readOnly: {
                type: Boolean,
                default: false
            }
        },

        data: function () {
            return {
            };
        },
        // mouted在vm.$el创建之后被执行
        mounted: function () {
            var vm = this;
            var lang = this.lang;
            var theme = this.theme;
            // 直接在外部创建编辑区会提示找不到相应的div元素
            // 可能是因为compile template的时候出了问题
            var editor = this.editor = ace.edit(vm.$el);
            var options = this.options;

            //设置编辑区的属性
            editor.$blockScrolling = Infinity;
            editor.getSession().setMode('ace/mode/' + lang);
            editor.setTheme('ace/theme/' + theme);
            editor.setValue(vm.content, 1);
            editor.setOptions(options);
            editor.setHighlightActiveLine(true);
            editor.setReadOnly(this.readOnly);

            //创建事件监听函数
            editor.on('change', function () {
                // 向父组件传递change事件
                vm.$emit('change', editor.getValue());
            });
            editor.on('copy', function (str) {
                // 向父组件传递copy事件                
                vm.$emit('copy', str);
            });
            editor.on('paste', function () {
                // 向父组件传递paste事件
                vm.$emit('paste');
            })
        },
        // 监听内容、语言设置选项和主题，达到动态改变语言和主题的效果
        watch: {
            // 'content': function (newContent) {
            //     var vm = this;
            //     if (this.sync) {
            //         vm.editor.setValue(newContent);
            //     }
            // },
            'lang': function () {
                this.editor.getSession().setMode('ace/mode/' + this.lang);
            }
        },
        // 暴露获得编辑区内容的方法，用于文件保存，这里应该还需要暴露设置编辑区内容的方法？
        methods: {
            getValue: function() {
                return this.editor.getValue();
            }
        }
    }
</script>


