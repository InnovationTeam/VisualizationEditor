<template>
    <div v-if="children" class="list">
        <template v-for="child in children">
            <layer :element="info[child]" :key="child.id"></layer>
        </template>
    </div>
</template>

<script>
import Layer from './Layer';

export default {
  name: 'Hierarchy',
  data(){
      return {
          info: this.$store.getters['ElementControl/getInfo']
      }
  },
  props: {
      children: Array
  },
  components: {
      'layer': Layer
  }
}
</script>


<style>
.list {
    padding: 0px;
    width: 100%;
    height: 100%;

    /* background-color: #2A3047; */
}

</style>
