<template>
    <transition name="slide-in-left">
        <div id="side-bar" v-if="show">
            <template v-for="entry in entries">
                <div :key="entry.itemText" class="entry">
                    <input type="radio" name="entry" style="display: none" />
                    <span class="icon"><icon :iconType="entry.iconType" /></span>
                    <span class="text">{{ entry.itemText }}</span>
                </div>
            </template>

            <div class="entry setting">
                <span class="icon"><icon :iconType="setting.iconType" /></span>
                <span class="text">{{ setting.itemText }}</span>
            </div>
        </div>
    </transition>
</template>


<script>
import Icon from './common/Icon'
import LEFTBAR_TEXT from '../assets/i18n/chs/leftbar.i18n.json'

export default {
    data () {
        let entries = []
        let setting
        let item = {
            iconType: '',
            itemText: ''
        }

        item.iconType = 'explorer'
        item.itemText = LEFTBAR_TEXT['LEFTBAR_EXPLORER']
        entries.push(JSON.parse(JSON.stringify(item)))

        item.iconType = 'search'
        item.itemText = LEFTBAR_TEXT['LEFTBAR_SEARCH']
        entries.push(JSON.parse(JSON.stringify(item)))

        item.iconType = 'config'
        item.itemText = LEFTBAR_TEXT['LEFTBAR_CONFIG']
        setting = JSON.parse(JSON.stringify(item))
        return {
            entries,
            setting,
            barSwitch: this.$parent.$children[0].$refs.menuNav
        }
    },
    computed: {
        show() {
            return this.$store.state.showLeftBar
        }
    },
    components: {
        'icon': Icon
    },
    mounted() {    
        document.addEventListener('click', (e) => {   
            if (this.show && !this.$el.contains(e.target) && e.target !== this.barSwitch) {
                this.$store.commit('toggleLeftBar')
            }
        })  
    }
}
</script>

<style lang="scss" scoped>
$side-bar-width: 270px;
#side-bar {
    background: rgba(54, 61, 82, 0.9);
    background: -webkit-linear-gradient(top, rgba(54, 61, 82, 0.9) 0%,rgba(23, 29, 53, 0.9) 100%);
    background: linear-gradient(to bottom, rgba(54, 61, 82, 0.9) 0%, rgba(23, 29, 53, 0.9) 100%);
    box-shadow: 4px 0px 9px -1px rgba(20, 20, 20, 0.6);
    text-align: center;
    width: $side-bar-width;
    font: {
        family: 'Consolas', 'Microsoft YaHei';
        size: 14px;
    }
    color: #80849a;
    display: flex;
    flex-direction: column;
    user-select: none;
}

$entry-height: 70px;
.entry {
    width: 100%;
    height: $entry-height;
    cursor: pointer;
    line-height: $entry-height;
    display: flex;

    &:hover {
        background-color: #24293a;
        color: #9295a9;
    }

    & span {
        &.icon {
            font-size: 50px;
            flex: 0 30%;
        }
        &.text {
            font-size: 16px;
        }
        
    }

    &.setting {
        position: absolute;
        bottom: 0;
    }
}

.slide-in-left-enter-active, .slide-in-left-leave-active {
  transition: all .25s ease;
}
.slide-in-left-enter, .slide-in-left-leave-to
/* .slide-in-left-leave-active for below version 2.1.8 */ {
  transform: translateX(-$side-bar-width);
}
</style>