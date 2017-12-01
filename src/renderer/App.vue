<template>
  <div id="application">
    <!-- <router-view></router-view> -->
    <editor></editor>
  </div>
</template>

<script>
  import editor from './components/Editor'
  export default {
    name: 'project',
    components: {editor}
  }
</script>

<style>
  /* CSS */
</style>
