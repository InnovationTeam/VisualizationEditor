<template>
    <div :class="['tab', isActive ? 'active' : '']" 
    :style="{fontStyle: isTemp ? 'italic' : 'normal'}">
        {{ fileName }}
        <span v-show="isActive" class="close-file-icon">
            <slot name="close-file-icon"></slot>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        fileName: String,
        id: String,
        isTemp: Boolean,
        isActive: Boolean
    },
    computed: {
        extension() {
            let index = this.fileName.lastIndexOf('.')
            return index > 0 ? this.fileName.substring(index + 1).toLowerCase() : ''
        },
		iconType() {
            let type = this.availableExtension[this.extension]
            return type !== undefined ? type : 'default'
		}
    }

}
</script>

<style lang="scss" scoped>
$tab-list-height: 30px;

.tab {
    float: left;
    height: $tab-list-height;
    line-height: $tab-list-height;
    color: #80849a;
    padding: {
        left: 10px;
        right: 10px;
    }
    cursor: pointer;
    &.active{
        background-color: #24293a;
        color: #9295a9;
    }
}

.close-file-icon {
    margin-left: 10px;
    font-style: normal;

    &:hover {
        color: white;
    }
}

</style>
