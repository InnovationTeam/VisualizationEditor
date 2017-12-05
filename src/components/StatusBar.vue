<template>
    <div id="status-bar">
        <span class="status-item left time">{{ hours }}:{{ minutes }}</span>
        <span class="status-item left shell clickable"><icon :iconType="'shell'" /></span>

        <span class="status-item right clickable">{{ language }}</span>
        <span class="status-item right clickable">{{ encode }}</span>
        <span class="status-item right clickable" @click="toggleReturnType">{{ returnType }}</span>
        <span class="status-item right clickable">{{ spaceInfo }}</span>
        <span class="status-item right clickable">{{ currCursorPlace }}</span>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import Icon from './common/Icon'

export default {
    data() {
        return {
            hours: '',
            minutes: ''
        }
    },
    created() {
        this.updateDateTime()
    },
    computed: {
        ...mapGetters({
            language: 'getLanguage',
            encode: 'getEncode',
            returnType: 'getReturnType',
            spaceInfo: 'getSpaceInfo',
            currCursorPlace: 'getCurrentCursorPlace'
        })
    },
    components: {
        'icon': Icon
    },
    methods: {
        ...mapMutations([
            'changeEncode',
            'toggleReturnType',
            'toggleSpaceType',
            'changeSpanceLength',
            'updateCurrentCursorPlace'
        ]),
        updateDateTime() {
            let date = new Date()

            this.hours = this.getZeroPad(date.getHours())
            this.minutes = this.getZeroPad(date.getMinutes())

            setTimeout(this.updateDateTime, 1000)
        },
        getZeroPad(n) {
            return (parseInt(n, 10) >= 10 ? '' : '0') + n;
        }
    }
}
</script>

<style lang="scss" scoped>
$status-bar-height: 25px;

#status-bar {
    width: 100%;
    height: $status-bar-height;
    user-select: none;
    background: #171d33;
    background: -webkit-linear-gradient(left, #171d33 0%, #171e31 50%, #171d33 100%);
    background: linear-gradient(to right, #171d33 0%, #171e31 50%, #171d33 100%);
    font: {
        family: 'Consolas';
        size: 14px;
    }
    color: #80849a;

    position: absolute;
    z-index: 0;
}   

.status-item {
    width: auto;
    height: inherit;
    line-height: $status-bar-height;
    cursor: pointer;
    text-align: center;
    float: left;
    padding: {
        left: 8px;
        right: 8px;
    }

    &.clickable:hover {
        background-color: #1f2331;
        color: #8f91a5;
    }

    &.time {
        cursor: default;
    }

    &.left {
        float: left;
    }

    &.right {
        float: right;
    }
}

</style>

