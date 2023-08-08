<template>
  <h1 class="text-6xl" >Table</h1>
  <div class="container flex flex-col justify-center items-center h-screen w-3/4 mx-auto bg-amber-200 ">
    <table class="h-3/4 w-full bg-blue-950 text-amber-50 py-4 rounded-xl">
      <thead>
        <tr>
          <th v-for="(header, idx) in bookKeys" :key="idx" >{{header}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(book, idx) in books" :key="idx">
          <td>{{book.title}}</td>
          <td>{{book.author}}</td>
          <td>{{book.rating}}</td>
          <td>{{isBestSelling(book.is_bestselling)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { BOOKS_API_INDEX } from '../utils/routes.js'
  import {ref, computed, onBeforeMount} from "vue";
  const books = ref([{}])
  const bookKeys = computed(() => Object.keys(books.value[0]))
  const isBestSelling = (ibs) => {
    return ibs ? 'Yes' : 'No'
  }
  onBeforeMount(async () => {
    try {
      let resp = await fetch(BOOKS_API_INDEX, {
        method: 'GET'
      })
      let data = await resp.json()
      // if errors
      if (!resp.ok) {
        let respErrors = await resp.json()
        throw Error(`404: Response Errors: ${respErrors}`)
      }
      // no errors
      books.value = data
      console.log('mounted books: ', books.value)
    } catch(err) {
      console.log(err.message)
    }
  })

</script>

<style scoped>

</style>