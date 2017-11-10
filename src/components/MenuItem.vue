<template>
    <div class="item">
        <slot></slot>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.item {
    width: auto;
    height: 20px;
    line-height: 20px;
    padding: 5px 20px 5px 20px;
    cursor: pointer;
    text-align: left;

    &:hover {
        background-color: #1f2331;
        color: #8f91a5;
    }
}

</style>

