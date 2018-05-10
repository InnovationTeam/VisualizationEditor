<template>
    <div v-if="children && children.length">
        <template v-for="child in children">
            <elem  v-bind="{attr: child.attr, tag: child.tag, children: child.children}" :key="child.id"></elem>
        </template>
    </div>
</template>

<script>
import Element from './Element';

export default {
  name: 'Renderer',
  props: {
      children: Array
  },
  components: {
      'elem': Element
  },
  methods: {
      
  }
}
</script>