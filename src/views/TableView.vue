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
  import {ref, computed, onBeforeMount} from "vue";

  // const tableHeaders = ref(['Title', 'Author', 'Rating'])
  // const booksTemp = ref([
  //   {title: 'watership down', author: 'Roald Dahl', rating: 3},
  //   {title: 'Grapes of Wrath', author: 'John Steinbeck', rating: 5},
  //   {title: 'Prince Caspian', author: 'C.S. Lewis', rating: 2},
  // ])
  const books = ref([{}])
  const bookKeys = computed(() => Object.keys(books.value[0]))
  const isBestSelling = (ibs) => {
    return ibs ? 'Yes' : 'No'
  }
  onBeforeMount(async () => {
    try {
      let resp = await fetch('http://127.0.0.1:8000/books/index', {
        method: 'GET'
      })
      let data = await resp.json()
      // if errors
      if (!resp.ok) {
        let respErrors = await resp.json()
        throw Error(`404: Response Errors: ${respErrors}`)
      }
      // no errors
      books.value = data.books
      console.log('mounted books: ', books.value)
    } catch(err) {
      console.log(err.message)
    }
  })

</script>

<style scoped>

</style>