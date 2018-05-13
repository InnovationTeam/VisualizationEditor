<template>
    <div class="phone" @dragenter="DragEnter($event)" @dragover="DragOver($event)" @drop="Drop($event)">
        <div class="scroll-container" ref="scroll" @mousewheel="ScrollContent_mousewheel($event)">
            <div :style="{height: scrollContainerHeight + 'px'}"></div>
        </div>
        <div class="phone-content-container" ref="contentContainer" @mousewheel="ScrollContent_mousewheel($event)">
            <div class="phone-content" ref="content">
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            scrollContainerHeight: 0,
            scrollStartY: 0,
        }
    },
    // computed: {
    //     scrollContainerHeight() {
    //         if(this.$refs.content === undefined)
    //             return 0
    //         return this.$refs.content.offsetHeight
    //     }
    // },
    methods: {
        DragEnter(e) {
            // console.log(e.target)
        },
        DragOver(e) {
            e.preventDefault()
            // console.log(e.target)
        },
        Drop(e) {
            e.preventDefault()
            // console.log(e.dataTransfer.getData('text/html'))
            // e.target.innerHTML += e.dataTransfer.getData('text/html')
            this.$refs.content.innerHTML += e.dataTransfer.getData('text/html')
            console.log(this.$refs.content.offsetHeight)
            this.scrollContainerHeight = this.$refs.content.offsetHeight
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

            & > div {
                height: 100px;
                width: inherit;
                background-color: aquamarine;
            }
        }
    }
}

</style>
