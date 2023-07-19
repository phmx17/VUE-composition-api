<template>
  <h1 class="text-6xl" >Login</h1>
  <div class="container flex flex-col justify-center items-center h-screen w-3/4 mx-auto bg-amber-200 ">
    <div class="searchBox h-1/2 w-1/2 bg-blue-950 text-amber-50 p-4 rounded-xl ">
      <label class="block text-2xl my-2 font-medium ">Enter Your Dev Name</label>
        <input class=" w-3/4 text-2xl bg-blue-950 rounded-md " type="text" placeholder="enter name" v-model="nameInput" autofocus />
<!--        <button class="bg-blue-800 rounded-md p-2 " >go!</button>-->
      <ul v-if="existSearchResults" class="w-3/4 mx-auto" v-for="(user, idx) in searchResults" :key="idx">
        <li  @click="selectName(idx)" class="listItem text-2xl" >{{user[0]}}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>

  import {ref, watch, computed} from "vue";
  import { useRouter, useRoute } from 'vue-router'

  const nameInput = ref('')
  const searchResults = ref([])
  const existSearchResults = computed(() => searchResults.value.length > 0) // no longer needed
  const nameResult = ref('')
  const router = useRouter() // can push from method
  const route = useRoute() // can push from method

  watch(nameInput, async() => {
    if (nameInput.value == '') {
      searchResults.value = [] // in order to not display results
      return
    }
    const formData = new FormData
    formData.append('requestedUser', nameInput.value)
    try {
      let resp = await fetch('http://127.0.0.1:8000/books/api/timeboss', {
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
      searchResults.value = data.users
    } catch(err) {
      console.log(err.message)
    }
  })
  const selectName = (idx) => {
    nameResult.value = searchResults.value[idx]
    nameInput.value = nameResult.value // place into search input
    // reidrect
    router.push('time')

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