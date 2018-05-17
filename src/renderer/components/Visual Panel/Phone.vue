<template>
    <div class="phone">
        <div class="header">
            <div class="phone-status">
                <span class="left">
                    <icon :iconType="'wechat_signal'" style="font-size: 16px"/>
                    <span>WeChat</span>
                    <icon :iconType="'wechat_wifi'" style="font-size: 16px"/>
                </span>
                <span class="middle">
                    {{hours}}:{{minutes}}
                </span>
                <span class="right">
                    <span>100%</span>
                    <icon :iconType="'wechat_battery'" style="font-size: 14px;"/>
                </span>
            </div>
            <div class="wechat-header">
                <span class="middle">WeChat</span>
                <span class="right">
                    <icon :iconType="'wechat_forward'" style="font-size: 22px"/>
                    <icon :iconType="'wechat_return'" style="font-size: 22px"/>
                </span>
            </div>
        </div>
        
        <div class="scroll-container" ref="scroll" @mousewheel="ScrollContent_mousewheel($event)">
            <div :style="{height: scrollContainerHeight + 'px'}"></div>
        </div>
        <div class="phone-content-container" ref="contentContainer"
            @dragover="DragOver($event)" 
            @drop="Drop($event)" 
            @mousewheel="ScrollContent_mousewheel($event)" 
            data-wx-element-id="main">
            <div id="phone-content" ref="content" data-wx-element-id="main">
                <template v-if="mainChildrenIDs && mainChildrenIDs.length">
                    <template v-for="id in mainChildrenIDs">
                        <element-renderer :childID="id" :key="id"></element-renderer>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import ElementRenderer from './ElementRenderer'
import Icon from '@/components/common/Icon'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('ElementControl')

export default {
    data() {
        return {
            hours: '',
            minutes: '',
            scrollContainerHeight: 0,
        }
    },
    computed: {
        ...mapGetters({
            mainChildrenIDs: 'getMainChildrenIDs'
        })
    },
    methods: {
        updateDateTime() {
            let date = new Date()

            function getZeroPad(n) {
                return (parseInt(n, 10) >= 10 ? '' : '0') + n;
            }

            this.hours = getZeroPad(date.getHours())
            this.minutes = getZeroPad(date.getMinutes())

            setTimeout(this.updateDateTime, 1000)
        },
        updateScrollContainerHeight() {
            if(this.$refs.content !== undefined)
                this.scrollContainerHeight = this.$refs.content.offsetHeight
            setTimeout(this.updateScrollContainerHeight, 1000)
        },
        ...mapMutations({
            appendChild: 'APPEND_CHILD',
            movingElement: 'MOVING_ELEMENT'
        }),
        DragOver(e) {
            e.preventDefault()
        },
        Drop(e) {
            e.preventDefault()
            let operation = e.dataTransfer.getData('text')
            let elementData = JSON.parse(e.dataTransfer.getData('application/json'))
            let targetID = e.target.dataset.wxElementId
            // console.log(operation)
            // console.log(elementData)

            if(operation === 'addElement') {
                this.appendChild({
                    id: targetID,
                    tagName: elementData.tagName,
                    cfgData: elementData.cfgData
                })
            }
            else if(operation === 'moveElement') {
                let fatherID = elementData.fatherID
                let movingElementID = elementData.movingElementID
                console.log('father: ' + fatherID)
                console.log('target: ' + targetID)
                console.log('moving: ' + movingElementID)

                if(targetID !== movingElementID) {
                    this.movingElement({
                        fatherID: fatherID,
                        targetID: targetID,
                        elementID: movingElementID
                    })
                }
            }
        },
        ScrollContent_mousewheel(e) {
            let dy = e.deltaY / 50
            let total = 0

            let contentContainerElement = this.$refs.contentContainer
            let scrollElement = this.$refs.scroll
            scrollElement.style.opacity = 1
            scrollElement.style.transition = 'opacity 0s'

            function scroll() {
                if(Math.abs(total) < Math.abs(e.deltaY)) {
                    contentContainerElement.scrollTop += dy
                    if(e.target !== scrollElement)
                        scrollElement.scrollTop += dy
                    total += dy
                    setTimeout(scroll, 5)
                }
                else {
                    scrollElement.style.opacity = 0
                    scrollElement.style.transition = 'opacity .7s'
                }
            }

            scroll()
        }
    },
    mounted() {
        this.updateDateTime()
        this.updateScrollContainerHeight()
    },
    components: {
        'element-renderer': ElementRenderer,
        'icon': Icon
    }
}
</script>

<style lang="scss" scoped>
$phone-header-phone-status-height: 20px;
$phone-header-wechat-header-height: 45px;
$phone-header-height: $phone-header-phone-status-height + $phone-header-wechat-header-height;

.header {
    position: absolute;
    z-index: 3;
    top: 0;
    height: $phone-header-height;
    width: inherit;
    
    & > .phone-status {
        height: $phone-header-phone-status-height;
        display: flex;
        align-items: center;
        justify-content: space-between;

        & span {
            margin: {
                left: 2px;
                right: 2px;
            }
        }

        & > span {
            margin: {
                left: 5px;
                right: 5px;
            }
        }

        & > .left {
            font-size: 12px;
            display: flex;
            align-items: center;
        }

        & > .middle {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            height: inherit;
            line-height: $phone-header-phone-status-height;
            width: 50px;
            text-align: center;
            font-size: 13px;
        }

        & > .right {
            font-size: 11px;
            display: flex;
            align-items: center;
        }
    }

    & > .wechat-header {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: $phone-header-wechat-header-height;

        & > .middle {
            position: absolute;
            left: 0;
            right: 0;
            margin: auto;
            height: inherit;
            line-height: $phone-header-wechat-header-height;
            width: 50px;
            text-align: center;
            font-size: 13px;
        }

        & > .right {
            & span {
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }
}

.phone {
    position: relative;
    height: inherit;
    width: inherit;
    background-color: white;
    box-shadow: 0px 1px 30px -15px rgba(0,0,0,1);

    & > .scroll-container {
        position: absolute;
        z-index: 2;
        right: 0;
        top: $phone-header-height;
        bottom: 0;
        width: 4px;
        overflow: auto;

        opacity: 0;

        &::-webkit-scrollbar-track {
            opacity: 0;
        }

        &::-webkit-scrollbar {
            width: 3px;
            opacity: 0;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 3px;
            background-color: rgba($color: #7b7b7b, $alpha: 0.75);
        }
    }

    & > .phone-content-container {
        position: absolute;
        z-index: 1;
        top: $phone-header-height;
        bottom: 0;
        width: inherit;
        overflow: hidden;

        & > #phone-content {
            width: inherit;
            height: auto;
        }
    }
}

</style>
