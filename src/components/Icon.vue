<template>
    <div :class="['icon', 'icon-' + iconType]"></div>
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
