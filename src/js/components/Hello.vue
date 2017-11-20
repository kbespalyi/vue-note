<template lang="pug">
div
  p {{ greeting }} World!
  other-component
</template>

<script>
  import OtherComponent from './OtherComponent.vue';

  export default {
    data() {
      return {
        greeting: 'Hello'
      }
    },
    components: {
      OtherComponent
    }
  }
</script>

<style lang="stylus" scoped>
  p
    font-size 2em
    text-aling center
</style>
