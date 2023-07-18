<template>
  <h1 class="text-6xl" >Search</h1>
  <div class="container flex flex-col justify-center items-center h-screen w-3/4 mx-auto bg-amber-200 ">
    <div class="searchBox h-1/2 w-1/2 bg-blue-950 text-amber-50 p-4 rounded-xl ">
      <label class="block text-2xl my-2 font-medium ">Search Title</label>
<!--      <input class="p-2 text-2xl bg-blue-800 rounded-md " type="text" placeholder="enter title" v-model="titleInput" autofocus />-->
        <input class=" w-3/4 text-2xl bg-blue-950 rounded-md " type="text" placeholder="enter title" v-model="titleInput" autofocus />
<!--        <button class="bg-blue-800 rounded-md p-2 " >go!</button>-->

      <ul v-if="existSearchResults" class="w-3/4 mx-auto" v-for="(title, idx) in searchResults" :key="idx">
        <li  @click="selectTitle(idx)" class="listItem text-2xl" >{{title}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import {ref, watch, computed} from "vue";

  const titleInput = ref('')
  const searchResults = ref([])
  const existSearchResults = computed(() => searchResults.value.length > 0) // no longer needed
  const titleResult = ref('')

  watch(titleInput, async() => {
    if (titleInput.value == '') {
      searchResults.value = [] // in order to not display results
      return
    }
    const formData = new FormData
    formData.append('titleInput', titleInput.value)
    try {
      let resp = await fetch('http://127.0.0.1:8000/books/api/search', {
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
  const selectTitle = (idx) => {
    titleResult.value = searchResults.value[idx]
    titleInput.value = titleResult.value // place into search input
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