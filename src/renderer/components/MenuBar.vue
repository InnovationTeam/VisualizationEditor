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
            <template v-for="menu in menus">
                <div :class="['menu-item', showMenu === menu.title ? 'active' : '']" 
                @click="ClickMenuTitle(menu.title)" @mouseover="OverMenuTitle(menu.title)" 
                :key="menu.title">
                    <span>{{ menu.title }}</span>
                    <sub-menu v-if="showMenu === menu.title">
                        <template v-for="item in menu.items">
                            <menu-item @click.native="item.method(item.name)" :key="item.name">{{ item.name }}</menu-item>
                        </template>
                    </sub-menu>
                </div>
            </template>

		    <span class="top-right-buttons close"><icon :iconType="'close'" /></span> 
		    <span class="top-right-buttons restore_down" :style="{display: !isWindow ? 'block' : 'none'}" @click="isWindow = !isWindow"><icon :iconType="'restore_down'" /></span>
		    <span class="top-right-buttons maximize" :style="{display: isWindow ? 'block' : 'none'}" @click="isWindow = !isWindow"><icon :iconType="'maximize'" /></span>
            <span class="top-right-buttons minimize"><icon :iconType="'minimize'" /></span>
        </div>
    </div>
</div>

</template>

<script>
import SubMenu from './SubMenu'
import MenuItem from './MenuItem'
import Icon from './common/Icon'
import MENU_TEXT from '../assets/i18n/chs/menus.i18n.json'

export default {
    data(){
        let menu_texts = []
        var menu_item = {
            title: '',
            items: []
        }

        let index = 'MENU_FILE'
        menu_item.title = MENU_TEXT[index]
        menu_item.items.push({ name: MENU_TEXT[index + '_NEW_PROJECT'],  method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_NEW_FILE'],     method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_NEW_WINDOW'],   method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_OPEN_FILE'],    method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_OPEN_FOLDER'],  method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_OPEN_RECENT'],  method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_SAVE'],         method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_SAVE_AS'],      method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_SAVE_ALL'],     method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_AUTO_SAVE'],    method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_OPTION'],       method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_CLOSE_EDITOR'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_CLOSE_FOLDER'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_CLOSE_WINDOW'], method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_RELOAD'],       method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_EXIT'],         method: (name) => {alert(name)} })
        menu_texts.push(menu_item)

        var menu_item = {
            title: '',
            items: []
        }
        index = 'MENU_EDIT'
        menu_item.title = MENU_TEXT[index]
        menu_item.items.push({ name: MENU_TEXT[index + '_UNDO'],                 method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_REDO'],                 method: (name) => {alert(name)} })
        menu_item.items.push({ name: MENU_TEXT[index + '_CUT'],                  method: (name) => {alert(name)} })
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
            isWindow: false
        }

    },
    computed: {
        isOpen() {
            return this.$store.state.showLeftBar
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
        test() {
            alert('a')
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
        family: 'Consolas';
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

.top-right-buttons {
    float: right;
    height: inherit;
    width: $menu-bar-height;
    line-height: $menu-bar-height;
    font-size: 18px;
    text-align: center;
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

.slide-out-up-enter-active, .slide-out-up-leave-active {
  transition: all .25s ease;
}
.slide-out-up-enter, .slide-out-up-leave-to {
  transform: translateY(-$menu-bar-height);
}
</style>

