<template>
  <h1 class="text-6xl">Search</h1>
  <div class="container flex flex-col justify-center items-center h-screen w-3/4 mx-auto bg-amber-200 ">
    <div class="searchBox h-1/2 w-1/2 bg-blue-950 text-amber-50 p-4 rounded-xl ">
      <label class="block text-2xl my-2 font-medium ">Search By Title</label>
        <input class=" w-3/4 text-2xl bg-blue-950 rounded-md " type="text" placeholder="enter name" v-model="titleInput" autofocus />
<!--        <button class="bg-blue-800 rounded-md p-2 " >go!</button>-->
        <ul class="w-3/4 mx-auto" v-for="(title, idx) in searchResults" :key="idx">
        <li v-if="existSearchResults"  @click="selectTitle(idx)" class="listItem text-2xl" >{{title}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>

  import { BOOKS_API_SEARCH } from '../utils/routes.js'

  import {ref, watch, computed} from "vue";
  import { useRouter } from 'vue-router'

  const titleInput = ref('')
  const searchResults = ref([])
  const existSearchResults = computed(() => searchResults.value.length > 0) // no longer needed
  const router = useRouter() // can push from method

  // sending request to api on entering input for book title
  watch(titleInput, async() => {
    if (titleInput.value == '') {
      searchResults.value = [] // in order to not display results
      return
    }
    const formData = new FormData
    console.log('BOOKS_API_SEARCH', BOOKS_API_SEARCH)
    formData.append('titleInput', titleInput.value)
    try {
      let resp = await fetch(BOOKS_API_SEARCH, {
        method: 'POST',
        body: formData
      })
      let data = await resp.json()
      // if errors
      if (!resp.ok) {
        let respErrors = await resp.json()
        throw Error(`404: Response Errors: ${respErrors}`)
      }
      // no errors
      searchResults.value = data.titleResults
    } catch(err) {
      console.log(err.message)
    }
  })
  // do a redirect when the title is selected from drop down list
  const selectTitle = (idx) => {
    titleInput.value = searchResults.value[idx] // place into search input
    // router.push('time') // reidrect
    searchResults.value = []
  }

</script >

<style scoped>
  .container {
    width: 70%;
  }
  input {
    display: inline-block;
  }
  input:focus {
    outline: none;
  }
  .listItem {
    cursor: pointer;
    margin: 0.5em 0;
    text-align: start;

  }
  .listItem:hover {
    background-color: cornflowerblue;
  }
</style>