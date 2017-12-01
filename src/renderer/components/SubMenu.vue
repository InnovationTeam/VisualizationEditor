
<template>
    <div class="menu">
        <slot></slot>
    </div>
</template>

<script>
export default { 
}
</script>

<style lang="scss" scoped>
.menu {
    min-width: 170px;
    float: left;
    padding: {
        top: 5px;
        bottom: 5px;
    } 
    background: #24293a;
}
</style>

