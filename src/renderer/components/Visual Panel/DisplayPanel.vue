<template>
    <div class="display-panel scrollable-y">
        <div class="status-bar">
        </div>
        <div class="phone-box">
            <div class="phone">
                <phone></phone>
            </div>
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
@import '~@/assets/common/border';

.display-panel {
    position: relative;
    float: left;
    width: 500px;
    height: inherit;
    background-color: #f3f2ee;
    @include thin_border(#d2d2d2, left);

    & > .status-bar {
        height: 30px;
        background-color: #f5f5f5;
        @include thin_border(#d2d2d2, bottom);
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
            margin: 0 auto;
            height: 736px;
            width: 414px;
        }
    }
   

}
</style>
