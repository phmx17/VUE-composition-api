<template>
  <div>
    <ul>
      <li v-for="(todoItem, idx) in data" :key="idx">
        title: {{todoItem.title}} | status: {{todoItem.status}}
        <button @click="$emit('removeTodo', todoItem.id)" class="p-1 rounded-md bg-red-300">X</button>
      </li>
    </ul>
  </div>
</template>

<!--<script>-->
<!--  export default {-->
<!--    props: ['data'],-->

<!--  }-->
<!--</script>-->

<script setup>
  import {defineProps} from 'vue'
  defineProps(['data'])

  // I don't know how to emit from CAPI with setup tag; except directly from the template
  // can use setup(props, context) and then context.emit('event', data) - see EmitterButton component

  // also don't know how to address props in here


</script >

<style scoped>

</style>