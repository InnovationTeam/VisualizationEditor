<template>
    <span :class="['icon', 'icon-' + iconType]"></span>
</template>

<script>
export default {
    props: {
        iconType: String
    }
}
</script>

<style lang="scss" scoped>
@import url('../assets/icons/WXVEicon/WXVEicon.css');

</style>
