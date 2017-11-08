<template>
    <div @click="toggle">
        <span class="folderIcon" :style="iconStyle">{{ iconType }}</span>

        <span class="folderName">
            <template v-if="!changing">
                <span @dblclick="changeName">{{ folderName }}</span>
            </template>
            <template v-else>
                <input @keyup.enter="notChange" @blur="notChange" v-focus="folderName" v-enter="!changing" v-model="folderName" spellcheck="false">
            </template>
        </span>
    </div>
</template>

<script>
import folderIconInfo from '../assets/icons/fontello/fontello-icon.json'

export default {
    props: {
        folderName: String
    },
    data() {
        return {
            changing: false,
            opened: false
        }
    },
    methods: {
        toggle() {
            this.opened = !this.opened
        },
        changeName() {
            this.changing = true
        },
        notChange() {
            this.changing = false
            if(this.folderName === '')
                this.folderName = 'untitled'
        }
    },
    computed:{
		icon() {
			let type = this.opened ? 'folder-open' : 'folder'
			return folderIconInfo['iconDefinitions'][type]
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
$folderIcon-font-family: fontello;

@font-face {
	font-family: $folderIcon-font-family;
	src: url('../assets/icons/fontello/fontello.woff');
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

span.folderIcon {
	font: {
		family: $folderIcon-font-family;
		size: 0.7em;
    }
    width: $basic-font-size * 1.2;
    text-align: center;
}

$font-color: #c5c5c5;

span.folderName {
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
