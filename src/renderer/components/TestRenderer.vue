<template>
    <Renderer :children="this.jsonData.children"></Renderer>
</template>

<script>
import store from '../store/jsonData';

export default {
  name: 'TestRenderer',
  data () {
    return {
      jsonData: store.state.json
    }
  }
}
</script>
