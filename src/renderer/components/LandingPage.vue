<template>
  <div id="editor">
    
    <editor :content="'variable'" :width="'50%'" :height="'500px'" :lang="'javascript'" :theme="'chrome'" 
      :sync="true" :options="options"></editor>

  </div>
</template>

<script>
  import editor from 'vue2-ace'
  import 'brace/mode/javascript'
  import 'brace/theme/chrome'


  export default {
    name: 'editor',
    components: { 
      editor 
    },
    methods: {
      
    },
    data(){
        return {
          options: {
            fontSize: '12pt'
          }
        }
      }
  }
</script>

<style>
  
</style>
