<template>
    <div class="display-panel scrollable-y">
        <div class="status-bar">
        </div>
        <div class="phone-box">
            <phone></phone>
        </div>
    </div>
</template>

<script>
import Phone from './Phone.vue'
export default {
    components: {
        'phone': Phone
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/common/scrollbar';

.display-panel {
    position: relative;
    float: left;
    width: 500px;
    height: inherit;
    background-color: #f3f2ee;

    & > .status-bar {
        height: 30px;
        background-color: violet;
    }

    & > .phone-box {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        @include autoAlign(500px);
        display: flex;
        align-items: center;

        & > .phone {
            
        }
    }
   

}
</style>
