<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export default {
  name: 'App',
  components: {
    HelloWorld,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
