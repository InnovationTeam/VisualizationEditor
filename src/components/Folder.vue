<template>
    <div @click="toggle">
        <span class="folderIcon"><icon :iconType="iconType" /></span>

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
import Icon from './Icon'

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
		iconType() {
			return 'folder_' + (this.opened ? 'open' : 'close')
		}
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus()
                el.setSelectionRange(0, -1)
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

span.folderIcon {
    margin-right: 3px;
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
