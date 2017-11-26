<template>
  <div id="app">
    <router-view></router-view>
    <editor></editor>
  </div>

  
</template>

<script>
  import editor_js from "./components/LandingPage"

  export default {
    name: 'my-project',
    components: {
      'editor': editor_js
    }
  }
</script>

<style>
  /* CSS */
</style>
