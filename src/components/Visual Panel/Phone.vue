<template>
    <div class="phone" @dragenter="DragEnter($event)" @dragover="DragOver($event)" @drop="Drop($event)">
        <div class="scroll-container" @mousewheel="ScrollContent_mousewheel($event)" ref="scroll">
            <!-- <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1> -->
            <div :style="{height: scrollLayerHeight + 'px'}"></div>
        </div>
        <div class="phone-content" ref="content">
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
            <h1>test</h1>
        </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            scrollLayerHeight: 973
        }
    },
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
        },
        ScrollContent_mousewheel(e) {
            let dy = e.deltaY / 50
            let total = 0
            console.log(e);
            let contentElement = this.$refs
            function scroll() {
                if(Math.abs(total) < Math.abs(e.deltaY)) {
                    contentElement.content.scrollTop += dy
                    total += dy
                    setTimeout(scroll, 5)
                }
            }
            scroll()
        }
    }

}
</script>

<style lang="scss" scoped>

.phone {
    margin: 0 auto;
    height: 736px;
    width: 414px;
    background-color: white;
    box-shadow: 0px 1px 30px -15px rgba(0,0,0,1);

    & > .scroll-container {
        position: absolute;
        z-index: 2;
        height: inherit;
        width: inherit;
        overflow: auto;
        color: aquamarine;

        opacity: 0;
        transition: opacity .5s;

        &:hover {
            opacity: 1;
            transition: opacity 0s;
        }

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

    & > .phone-content {
        position: absolute;
        z-index: 1;
        height: inherit;
        width: inherit;
        overflow: hidden;
    }
}

</style>
