<template>
    <component v-bind:is="elements[this.tag]" :attr="this.attr" :children="this.children"></component>
</template>

<script>
import View from '../Elements/View';
import Button from '../Elements/Button';

export default {
  name: 'Element',
  data(){
      return {
          elements: {
              'view': 'view-elem',
              'button': 'button-elem'
          }
      }
  },
  props: {
      tag: String,
      attr: Object,
      children: Array
  },
  components: {
      'view-elem': View,
      'button-elem': Button
  }
}
</script>
