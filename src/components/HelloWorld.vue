<template>
  <div class="text-xl  font-mono flex flex-col justify-center bg-blue-300 items-center h-screen" >
    <h1> Let us try some reactive data using refs in Composition Api</h1>
    <input class="my-3 p-4 rounded-md" type="text" placeholder="enter auto brand" v-model="query" />
    <button class="p-4 rounded-md bg-red-300" type="button" @click="reset">clear</button>
    <SearchResults :query="query" />
  </div>
  <div class="text-xl font-mono flex flex-col justify-center bg-blue-200 items-center" >
    <h1 class="my-3" > Let's fetch some repos from Github</h1>
    <input class="my-3 p-4 rounded-md" type="text" placeholder="github user" v-model="gitUser" />
    <button class="p-4 rounded-md bg-red-300" @click="submitGitUser = gitUser">submit</button>
    <div class="my-3" >
      <ul class="flex flex-col justify-center" >
        <li v-for="repo in data" :key="repo.id">
          {{repo.name }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { ref, watch, reactive, toRefs } from 'vue'
import SearchResults from "@/components/SearchResults.vue";
export default {
  components: {
    SearchResults,
  },
  // setup() used after importing ref; will handle all reactive data like computed, data, methods etc.
  setup() {
    const query = ref('') // make reactive and set initial val
    const reset = () => query.value = '' // query is a proxy object
    const gitUser = ref(null)
    const submitGitUser = ref(null)
    const state = reactive({data: []})
    watch(async () => {
      if (!submitGitUser.value) return
      const response = await fetch(`https://api.github.com/users/${submitGitUser.value}/repos`)
      const repos = await response.json()
      console.log(repos[0].name)
      state.data = repos
    })
    return {
      query,
      reset,
      gitUser,
      submitGitUser,
      ... toRefs(state)

    }
  },
  // data() {
  //   return {
  //     count: 0
  //   }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  background-color: #228bec;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
