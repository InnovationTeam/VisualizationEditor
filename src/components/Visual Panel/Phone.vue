<template>
    <div class="phone">
        <div class="scroll-container" ref="scroll" @mousewheel="ScrollContent_mousewheel($event)">
            <div :style="{height: scrollContainerHeight + 'px'}"></div>
        </div>
        <div class="phone-content-container" ref="contentContainer"
            @dragover="DragOver($event)" 
            @drop="Drop($event)" 
            @mousewheel="ScrollContent_mousewheel($event)" 
            data-wx-element-id="main">
            <div class="phone-content" ref="content" data-wx-element-id="main">
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
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('ElementControl')

export default {
    data() {
        return {
            scrollContainerHeight: 0,
            scrollStartY: 0,
        }
    },
    computed: {
        ...mapGetters({
            mainChildrenIDs: 'getMainChildrenIDs'
        })
    },
    methods: {
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
            

            this.scrollContainerHeight = this.$refs.content.offsetHeight
        },
        ScrollContent_mousewheel(e) {
            let dy = e.deltaY / 50
            let total = 0

            // this.appendChild({id:'main',tagName:'button',cfgData:{
            //     size: 0,
            //     type: 0,
            //     plain: false,
            //     disabled: false,
            //     loading:  false,
            //     text: "1"
            // }})
            // console.log(this.mainChildrenIDs)

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
    components: {
        'element-renderer': ElementRenderer
    }

}
</script>

<style lang="scss" scoped>

.phone {
    position: relative;
    height: inherit;
    width: inherit;
    background-color: white;
    box-shadow: 0px 1px 30px -15px rgba(0,0,0,1);

    & > .scroll-container {
        position: absolute;
        right: 0;
        z-index: 2;
        height: inherit;
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
            background-color: rgba($color: #8e8e8e, $alpha: 0.75);
        }
    }

    & > .phone-content-container {
        position: absolute;
        z-index: 1;
        height: inherit;
        width: inherit;
        overflow: hidden;

        & > .phone-content {
            width: inherit;
            height: auto;
        }
    }
}

</style>
