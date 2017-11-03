<template>
    <div>
        <span class="fileIcon" :style="iconStyle">{{ iconType }}</span>

        <span class="fileName">
            <template v-if="!changing">
                <span @dblclick="changeName">{{ fileName }}</span>
            </template>
            <template v-else>
                <input @keyup.enter="notChange" @blur="notChange" v-focus="fileName" v-enter="!changing" v-model="fileName" spellcheck="false">
            </template>
        </span>

        <!-- <span class="directory">
            <template v-if="opened">
            </template>
        </span> -->
    </div>
</template>

<script>
import fileIconInfo from '../assets/icons/seti/seti-icon.json'

export default {
    props: {
        fileName: String
    },
    data() {
        return {
            dir: 'src/test',
            changing: false
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
		icon() {
			let IDs = fileIconInfo['extensions']
			return IDs[this.extension] !== undefined ? fileIconInfo['iconDefinitions'][IDs[this.extension]] : fileIconInfo['iconDefinitions'][IDs['file']]
		},
		iconType() {
			return this.icon['fontCharacter']
		},
		iconStyle() {
			return {
				'color': this.icon['fontColor']
			}
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
    }
}
</script>

<style lang="scss" scoped>
$basic-font-size: 20px;
$basic-height: 21px;
$fileIcon-font-family: seti;

@font-face {
	font-family: $fileIcon-font-family;
	src: url('../assets/icons/seti/seti.woff');
}

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
	font: {
		family: $fileIcon-font-family;
		size: 1em;
    }
    width: $basic-font-size * 1.2;
    text-align: center;
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
        family: "Microsoft YaHei";
    }
    padding: {
        left: 2px;
    }
}
</style>
