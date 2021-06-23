<template>
  <div id="app">
    Hello World
    <bank />
  </div>
</template>

<script>

import Bank from '@/components/Bank'

export default {
  name: "App",
  components: {
    Bank
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
