<template>
<div id="menu-bar">
    <div id="menu-nav" @click.stop="ClickNavIcon" ref="menuNav">
        <div id="nav-icon" :class="[isOpen ? 'open' : '']">
            <span></span><span></span><span></span>
        </div>
    </div>

    <div id="menu-bar-toggle" @click.self="haveClicked = false; showMenu = ''" @mouseover="OverMenuBar" @mouseout="OutMenu">
        <transition name="slide-out-up" mode="out-in">
            <div v-if="!isFocus" id="menu-info" key="menu-info">
                <slot name="current-file">VisualizationEditor</slot>    
            </div>   
        </transition>
             
        <div id="menu-bar-buttons">
            <div class="menu-bar-options">
                <template v-for="menu in menus">
                    <div :class="['menu-item', showMenu === menu.title ? 'active' : '']" 
                    @click="ClickMenuTitle(menu.title)" @mouseover="OverMenuTitle(menu.title)" 
                    :key="menu.title">
                        <span>{{ menu.title }}</span>
                        <sub-menu v-if="showMenu === menu.title">
                            <template v-for="item in menu.items">
                                <menu-item @click.native.stop="selectOther(); item.method(item.name)" :key="item.name">{{ item.name }}</menu-item>
                            </template>
                        </sub-menu>
                    </div>
                </template>
            </div>

            <div id="menu-bar-toggle-panel-buttons">
                <div :class="['toggle-panel-button', useCodeEditor ? 'active' : '']" @click="UseCodeEditor">代码编辑</div>
                <div :class="['toggle-panel-button', useVisualEditor ? 'active' : '']" @click="UseVisualEditor">组件编辑</div>
            </div>

		    <span class="top-right-buttons close" @click="close"><icon :iconType="'close'" /></span> 
		    <span class="top-right-buttons restore_down" :style="{display: !isWindow ? 'block' : 'none'}" @click="unmaximize"><icon :iconType="'restore_down'" /></span>
		    <span class="top-right-buttons maximize" :style="{display: isWindow ? 'block' : 'none'}" @click="maximize"><icon :iconType="'maximize'" /></span>
            <span class="top-right-buttons minimize" @click="minimize"><icon :iconType="'minimize'" /></span>
        </div>
    </div>
</div>

</template>

<script>
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
import Icon from './common/Icon'
import MENU_TEXT from '../assets/i18n/chs/menus.i18n.json'
import * as dialog from '@/../api/Dialog/dialog'
import Edit from '@/../api/Edit'
import File from '@/../api/File'

export default {
    data(){
        let menu_texts = []
        var menu_item = {
            title: '',
            items: []
        }

        let index = 'MENU_FILE'
        menu_item.title = MENU_TEXT[index]
        menu_item.items.push({ name: MENU_TEXT[index + '_NEW_PROJECT'],  method: () => {
            let path = File.copyProject() 
            console.log(path)
            this.$store.commit('FileControl/OPEN_FOLDER_BY_PATH', {path: path})
        } })
        menu_item.items.push({ name: MENU_TEXT[index + '_NEW_FILE'],     method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_NEW_WINDOW'],   method: dialog.createWindow })
        menu_item.items.push({ name: MENU_TEXT[index + '_OPEN_FILE'],    method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_OPEN_FOLDER'],  method: () => {this.$store.commit('FileControl/OPEN_FOLDER')} })
        menu_item.items.push({ name: MENU_TEXT[index + '_OPEN_RECENT'],  method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_SAVE'],         method: () => {
            // console.log(this.$parent.$children)
            // console.log(window.editor.getValue())
            if(this.$store.state.useCodeEditor){
                let activePath = this.$store.getters['FileControl/getActivePath']
                File.saveFile(window.editor, activePath)
                // if(activePath !== '' && activePath !== undefined) {
                //     this.$store.commit('FileControl/OPEN_TEMPORARILY', {
                //         id: this.$store.getters['FileControl/getActiveID'],
                //         path: activePath
                //     })
                // }
            }
            else {
                let wxml_path = this.$store.getters['FileControl/getActiveWXMLFilePath']
                this.$store.commit('ElementControl/EXPORT_TO_WXML', wxml_path)
            }
        } })
        menu_item.items.push({ name: MENU_TEXT[index + '_SAVE_AS'],      method: () => {
            File.saveAs(
                // this.$parent.$children[2].$refs[this.$store.getters['FileControl/getActiveID']][0]
                window.editor
            )
        } })
        menu_item.items.push({ name: MENU_TEXT[index + '_SAVE_ALL'],     method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_AUTO_SAVE'],    method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_OPTION'],       method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_CLOSE_EDITOR'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_CLOSE_FOLDER'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_CLOSE_WINDOW'], method: dialog.close })
        menu_item.items.push({ name: MENU_TEXT[index + '_RELOAD'],       method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_EXIT'],         method: (name) => {alert(name)} })
        menu_texts.push(menu_item)

        var menu_item = {
            title: '',
            items: []
        }
        index = 'MENU_EDIT'
        menu_item.title = MENU_TEXT[index]
        menu_item.items.push({ name: MENU_TEXT[index + '_UNDO'],                 method: () => {
            Edit.undo(window.editor)
        } })
        menu_item.items.push({ name: MENU_TEXT[index + '_REDO'],                 method: () => {
            Edit.redo(window.editor)
        } })
        menu_item.items.push({ name: MENU_TEXT[index + '_CUT'],                  method: () => {
            Edit.cut(window.editor)
        } })
        menu_item.items.push({ name: MENU_TEXT[index + '_COPY'],                 method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_PASTE'],                method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_FIND'],                 method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_REPLACE'],              method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_FIND_IN_FILES'],        method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_LINE_COMMENT'],  method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_BLOCK_COMMENT'], method: (name) => {alert(name)} })
        menu_texts.push(menu_item)

        var menu_item = {
            title: '',
            items: []
        }
        index = 'MENU_SELECT'
        menu_item.title = MENU_TEXT[index]
        menu_item.items.push({ name: MENU_TEXT[index + '_SELECT_ALL'],                       method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_COPY_PREV_LINE'],                   method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_COPY_NEXT_LINE'],                   method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_MOVE_PREV_LINE'],                   method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_MOVE_NEXT_LINE'],                   method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ADD_CURSOR_ABOVE'],                 method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ADD_CURSOR_BELOW'],                 method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ADD_CURSOR_EACH_LINE_END'],         method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ADD_SELECTION_TO_NEXT_FIND_MATCH'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ADD_SELECTION_TO_LAST_FIND_MATCH'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ADD_SELECTION_TO_ALL_FIND_MATCH'],  method: (name) => {alert(name)} })
        menu_texts.push(menu_item)

        var menu_item = {
            title: '',
            items: []
        }
        index = 'MENU_VIEW'
        menu_item.title = MENU_TEXT[index]
        menu_item.items.push({ name: MENU_TEXT[index + '_VIEWEXPLORER'],              method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_SEARCH'],                    method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_PROBLEM'],                   method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_FULL_SCREEN'],        method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_ZEN_MODE'],           method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_SPLIT_EDITOR'],              method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_EDITOR_LAYOUT'],      method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_MENU_BAR'],           method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_SIDE_BAR'],           method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_PANEL'],              method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_HIDE_STATUS_BAR'],           method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_RIGHT_SIDE_BAR'],     method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_TOGGLE_RENDER_WHITE_SPACE'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ZOOM_IN'],                   method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ZOOM_OUT'],                  method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ZOOM_RESET'],                method: (name) => {alert(name)} })
        menu_texts.push(menu_item)

        var menu_item = {
            title: '',
            items: []
        }
        index = 'MENU_GOTO'
        menu_item.title = MENU_TEXT[index]
        menu_item.items.push({ name: MENU_TEXT[index + '_BACK'],            method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_FORWARD'],         method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_GOTO_FILE'],       method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_GOTO_DEFINITION'], method: (name) => {alert(name)} })
        menu_texts.push(menu_item)
        
        var menu_item = {
            title: '',
            items: []
        }
        index = 'MENU_HELP'
        menu_item.title = MENU_TEXT[index]
        menu_item.items.push({ name: MENU_TEXT[index + '_RELEASE_NOTES'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_LICENSE'],       method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_REPORT'],        method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_WELCOME'],       method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_CHECK_UPDATE'],  method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_ABOUT'],         method: (name) => {alert(name)} })
        menu_texts.push(menu_item)

        return {
            menus: menu_texts,
            haveClicked: false,
            showMenu: '',
            isFocus: false,
            isWindow: true
        }

    },
    computed: {
        isOpen() {
            return this.$store.state.showLeftBar
        },
        useCodeEditor() {
            return this.$store.state.useCodeEditor
        },
        useVisualEditor() {
            return this.$store.state.useVisualEditor
        }
    },
    components:{
        'sub-menu': SubMenu,
        'menu-item': MenuItem,
        'icon': Icon
    },
    methods: {
        ClickMenuTitle(selected) {
            if (!this.haveClicked)
                this.haveClicked = true
            this.showMenu = selected
        },
        OverMenuTitle(overed) {
            if (this.haveClicked)
                this.showMenu = overed
        },
        OverMenuBar(){
            if (!this.isOpen) 
                this.isFocus = true
        },
        OutMenu() {
            if (!this.haveClicked)
                this.isFocus = false
        },
        ClickNavIcon() {
            this.haveClicked = false
            this.showMenu = ''
            this.isFocus = false
            this.$store.commit('toggleLeftBar')
        },
        UseCodeEditor() {
            let activePath = this.$store.getters['FileControl/getActivePath']
            if(activePath !== '' && activePath !== undefined) {
                this.$store.commit('FileControl/OPEN_TEMPORARILY', {
                    id: this.$store.getters['FileControl/getActiveID'],
                    path: activePath
                })
            }
            this.$store.commit('USE_CODE_EDITOR')
        },
        UseVisualEditor() {
            let wxss_path = this.$store.getters['FileControl/getActiveWXSSFilePath']
            let wxml_path = this.$store.getters['FileControl/getActiveWXMLFilePath']
            if(wxss_path !== '' && wxss_path !== undefined) {
                this.$store.commit('ElementControl/PARSE_WXSS_FILE', wxss_path)
                this.$store.commit('ElementControl/EXPORT_TO_WXSS', {path: wxss_path})
            }
            if(wxml_path !== '' && wxml_path !== undefined)
                this.$store.commit('ElementControl/PARSE_WXML_FILE', wxml_path)

            let cssTag = document.getElementById('dynamicCSS');
            let head = document.getElementsByTagName('head').item(0);
            if(cssTag) head.removeChild(cssTag);
            let css = document.createElement('link');
            css.href = this.$store.getters['FileControl/getActiveWXSSCacheFilePath'];
            console.log(this.$store.getters['FileControl/getActiveWXSSCacheFilePath'])
            css.rel = 'stylesheet';
            css.type = 'text/css';
            css.id = 'dynamicCSS';
            head.appendChild(css);
            console.log(css)
            this.$store.commit('USE_VISUAL_EDITOR')
        },
        close() {
            dialog.close()
        },
        maximize() {
            this.isWindow = !this.isWindow
            dialog.maximize()
        },
        minimize() {
            dialog.minimize()
        },
        unmaximize() {
            this.isWindow = !this.isWindow
            dialog.unmaximize()
        },
        selectOther() {
            this.showMenu = ''   
            this.haveClicked = false
            this.isFocus = false
        }

    },
    mounted() {    
        document.addEventListener('click', (e) => {    
            if (!this.$el.contains(e.target)) {
                this.showMenu = ''   
                this.haveClicked = false
                this.isFocus = false
            }
        })  
    }

}
</script>

<style lang="scss" scoped>
$menu-bar-height: 30px;
$menu-item-width: 50px;

#menu-bar {
    width: 100%;
    height: $menu-bar-height;
    user-select: none;
    background: #292d43;
    background: -webkit-linear-gradient(left, #292d43 0%,#2d364e 50%,#262b41 100%);
    background: linear-gradient(to right, #292d43 0%,#2d364e 50%,#262b41 100%);
    font: {
        family: 'Consolas', 'Microsoft YaHei';
        size: 14px;
    }
    color: #80849a;

    position: absolute;
    z-index: 0;
}   

#menu-nav {
    width: $menu-bar-height;
    height: $menu-bar-height;
    float: left;
   
    align-items: center;
    display: flex;
    cursor: pointer;

    position: absolute;
    z-index: 3;

    &:hover {
        background-color: #24293a;
    }
}

$nav-icon-width: 16px;
$nav-icon-height: 12px;
$nav-icon-span-height: 2px;

#nav-icon {
    width: $nav-icon-width;
    height: $nav-icon-height;
    transform: rotate(0deg);
    transition: .5s ease-in-out;
    margin: auto;
    & span {
        display: block;
        position: absolute;
        height: $nav-icon-span-height;
        width: 100%;
        background: #9a9db3;
        border-radius: $nav-icon-span-height;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: .25s ease-in-out;

        &:nth-child(1) {
            top: 0px;
        }
        &:nth-child(2) {
            top: ($nav-icon-height - $nav-icon-span-height) * 0.5;
        }
        &:nth-child(3) {
            top: ($nav-icon-height - $nav-icon-span-height);
        }
    }

    &.open span {
        &:nth-child(1) {
            top: ($nav-icon-height - $nav-icon-span-height) * 0.5;
            transform: rotate(-135deg);
        }
        &:nth-child(2) {
            opacity: 0;
            left: $nav-icon-width;
        }
        &:nth-child(3) {
            top: ($nav-icon-height - $nav-icon-span-height) * 0.5;
            transform: rotate(135deg);
        }
    } 
}

#menu-bar-toggle {
    height: inherit;
}

#menu-info {
    height: inherit;
    width: 100%;
    line-height: $menu-bar-height;
    text-align: center;
    background: #292d43;
    background: -webkit-linear-gradient(left, #292d43 0%,#2d364e 50%,#262b41 100%);
    background: linear-gradient(to right, #292d43 0%,#2d364e 50%,#262b41 100%);

    position: absolute;
    z-index: 2;
}

#menu-bar-buttons {
    height: $menu-bar-height;
    left: $menu-bar-height;
    right: 0;
    position: absolute;
    z-index: 1;
}
 
.menu-item {
    height: inherit;
    width: $menu-item-width;
    
    line-height: $menu-bar-height;
    float: left;
    cursor: pointer;
    text-align: center;

    &:hover, &.active {
        background-color: #24293a;
        color: #9295a9;
    }
}

button {
     cursor: pointer;
}

#menu-bar-buttons {
    position: absolute;
    z-index: 1;

    height: $menu-bar-height;
    line-height: $menu-bar-height;
    left: 0;
    right: 0;

    & .menu-bar-options {
        position: absolute;
        z-index: 1;

        left: $menu-bar-height;
        height: inherit;
        float: left;

        & .menu-item {
            height: inherit;
            width: $menu-item-width;
            line-height: $menu-bar-height;

            float: left;
            cursor: pointer;
            text-align: center;

            &:hover, &.active {
                background-color: #24293a;
                color: #9295a9;
            }
        }
    }

    & #menu-bar-toggle-panel-buttons {
        position: absolute;
        z-index: 0;

        height: inherit;
        line-height: $menu-bar-height;
        left: 0;
        right: 0;
        text-align: center;

        & .toggle-panel-button {
            display: inline-block;
            width: 75px;
            height: 20px;
            line-height: 21px;
            margin-top: 4px;
            border-radius: 2px;
            border: 1px solid #9295a9 ;
            cursor: pointer;

            &.active {
                background-color: #24293a;
                color: white;
            }
        }
    }

    & .top-right-buttons {
        position: relative;
        z-index: 1;

        height: inherit;
        width: $menu-bar-height;
        line-height: $menu-bar-height;
        font-size: 18px;
        text-align: center;
        float: right;
        cursor: pointer;

        &.close:hover {
            background-color: #e64d4c;
            color: #d8d8d8;
        }

        &.restore_down:hover,
        &.maximize:hover {
            background-color: #1f2433;
            color: #9295a9;
        }

        &.minimize:hover {
            background-color: #222738;
            color: #9295a9;
        }
    }
}

.slide-out-up-enter-active, .slide-out-up-leave-active {
  transition: all .25s ease;
}
.slide-out-up-enter, .slide-out-up-leave-to {
  transform: translateY(-$menu-bar-height);
}
</style>

