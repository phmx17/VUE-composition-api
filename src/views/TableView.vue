<template>
  <h1 class="text-6xl" >Table</h1>
  <div class="container flex flex-col justify-center items-center h-screen w-3/4 mx-auto bg-amber-200 ">
    <table class="searchBox h-3/4 w-full bg-blue-950 text-amber-50 p-4 rounded-xl ">
      <thead>
        <tr>
          <th v-for="(header, idx) in tableHeaders" :key="idx" >{{header}}</th>
        </tr>
      </thead>
      <table-body>
        <tr v-for="(book, idx) in books" :key="idx">
          <td  >{{book.title}}</td>
          <td  >{{book.author}}</td>
          <td  >{{book.rating}}</td>
        </tr>
      </table-body>



    </table>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const tableHeaders = ref(['Title', 'Author', 'Rating'])
  const books = ref([
    {title: 'watership down', author: 'Roald Dahl', rating: 3},
    {title: 'Grapes of Wrath', author: 'John Steinbeck', rating: 5},
    {title: 'Prince Caspian', author: 'C.S. Lewis', rating: 2},
  ])

</script>

<style scoped>

</style>