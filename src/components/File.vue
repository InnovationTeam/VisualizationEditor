<template>
    <div>
        <span class="fileIcon"><icon :iconType="iconType" /></span>

        <span class="fileName">
            <template v-if="!changing">
                <span @click.right="changeName">{{ fileName }}</span>
            </template>
            <template v-else>
                <input @keyup.enter="notChange" @blur="notChange" v-focus="fileName" v-enter="!changing" v-model="fileName" spellcheck="false">
            </template>
        </span>
    </div>
</template>

<script>
import Icon from './common/Icon'

export default {
    props: {
        fileName: String
    },
    data() {
        let availableExtension = {
            'js': 'javascript',
            'wxs': 'javascript',
            'wxss': 'css',
            'json': 'json',
            'wxml': 'html'
        }
        return {
            dir: 'src/test',
            changing: false,
            availableExtension: availableExtension
        }
    },
    methods: {
        changeName() {
            this.changing = true
        },
        notChange() {
            this.changing = false
            if(this.fileName === '')
                this.fileName = 'untitled'
        }
    },
    computed:{
        extension() {
            let index = this.fileName.lastIndexOf('.')
            return index > 0 ? this.fileName.substring(index + 1).toLowerCase() : ''
        },
		iconType() {
            let type = this.availableExtension[this.extension]
            return type !== undefined ? type : 'default'
		}
    },
    directives: {
        focus: {
            inserted(el, {value}) {
                el.focus()
                let index = value.lastIndexOf('.')
                el.setSelectionRange(0, index > 0 ? index : -1)
            }
        },
        enter: {
            inserted(el, {value}) {
                if(value) {
                    el.blur()
                }
            }
        }
    },
    components: {
        'icon': Icon
    }
}
</script>

<style lang="scss" scoped>
$basic-font-size: 20px;
$basic-height: 21px;

div {
    color: white;
    font-size: $basic-font-size;
    height: $basic-height;
    
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
}

span.fileIcon {
	margin-right: 3px;
}

$font-color: #c5c5c5;

span.fileName {
    color: $font-color;
    font: {
        size: 0.64em;
    }
    line-height: 20px;
}

input {
    background-color: rgb(29, 29, 29);
    color: $font-color;
    border: 1px solid #009fff;
    outline: none;
    border-radius: 3px;
    font: {
        family: 'Microsoft YaHei';
    }
    padding: {
        left: 2px;
    }
}
</style>
