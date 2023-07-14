<template>
  <div>
    <ul>
      <li v-for="(todoItem, idx) in data" :key="idx">
        title: {{todoItem.title}} | status: {{todoItem.status}}
<!--        <button @click="$emit('removeTodo', todoItem.id)" class="p-1 rounded-md bg-red-300">X</button>-->
        <button @click="handlerRemoveTodo(todoItem.id)" class="p-1 rounded-md bg-red-300">X</button>
        <button></button>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {defineProps, defineEmits } from 'vue'
  defineProps(['data'])
  const emit = defineEmits(['removeTodo'])  // more details on defineEmits: https://learnvue.co/articles/vue-emit-guide
  const handlerRemoveTodo = (todoItem) => {
    emit('removeTodo', todoItem)
  }

</script >

<style scoped>

</style>