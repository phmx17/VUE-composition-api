<template>
  <h1 class="font-bold text-2xl " > Books Api </h1>
  <button @click="handleGetBooks" class="p-4 rounded-md bg-blue-300 text-white font-semibold ">Click to get list</button>

  <div v-if="errorMessage" class="error flex flex-col">
    <h1 class="font-bold text-2xl ">An Error has occured</h1>
    <p class="text-red-600 " >"{{errorMessage}}"</p>
    <button @click="errorMessage=''" class="p-4 rounded-md bg-red-300 text-white font-semibold ">Ignore</button>
  </div>
  <div v-if="showBooks" class="error flex flex-col">
    <h1 class="font-bold text-2xl ">List of Books</h1>
    <ul>
      <li v-for="(book, idx) in bookList" :key="idx" >{{ idx }}) "{{book.title}}" by {{book.author}} rating: {{book.rating}}</li>
    </ul>
    <button @click="showBooks = False" class="p-4 mt-4 rounded-md bg-blue-300 text-white font-semibold ">Hide List</button>


</div>


</template>

<script setup>
  import {ref} from 'vue'
  const bookList = ref([])
  const errorMessage = ref('')
  const showBooks = ref(false)
  const handleGetBooks = async() => {
    // make axios request
    try {
    let data = await fetch('http://127.0.0.1:8000/api/books/index', {
        // method: 'GET',
        // headers: {'Access-Control-Allow-Origin': 'localhost:8080',
        //           'Content-Type': 'Application/json'
        // }
    })// response object
      if (!data.ok) throw Error('No records available')
      data = await data.json() // convert to data
      bookList.value = data
      // console.log('bookList : ', bookList.value)
      showBooks.value = true
      return bookList.value
    }
    catch (err) {
      console.log('an error has occured:', err.message)
      errorMessage.value = err.message

    }
  }

</script>




<style scoped>
  .error {
    background-color: #555566;
    color: aliceblue;
    max-width: 50%;
    margin: 0 auto;
    margin-top: 2em;
    border-radius: 5px;
    padding: 2em;
  }
</style>