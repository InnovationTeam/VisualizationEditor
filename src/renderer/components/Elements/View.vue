<template>
  <div :style="attr['style']">
    <Renderer :children="this.children"></Renderer>      
  </div>
</template>

<script>
export default {
    name: 'View',
    props: {
        attr: Object,
        children: Array
    },
    methods: {

    }
}
</script>

