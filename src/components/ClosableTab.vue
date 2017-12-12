<template>
    <div class="tab">
        test.css
    </div>
</template>

<script>
export default {
    props: {
        fileName: String
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
    &:hover{
        background-color: #24293a;
        color: #9295a9;
    }
}

</style>
