<template>
  <!-- Example using ref and custom component SearchResults to get a list of car manuf. models -->
  <!-- using tailwind -->
  <div class="text-xl  font-mono flex flex-col justify-center bg-blue-300 items-center" >
    <h1> Let us try some reactive data using refs in Composition Api</h1>
    <input class="my-3 p-4 rounded-md" type="text" placeholder="enter auto brand" v-model="query" />
    <button class="p-4 rounded-md bg-red-300" type="button" @click="reset">clear</button>
    <SearchResults :query="query" />
  </div>
  <!-- Example using reactive, watch and toRefs in order to fetch a list of repos of a given user -->
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
  <div class="text-xl font-mono flex flex-col justify-center bg-blue-200 items-center" >
    <h1 class="my-3" > Let's check out a reference to a DOM element</h1>
    <p class="bg-red-300 myBtn my-3 p-2" ref="para" @click="activatePara" >Hi. My name is {{dogName}}</p>
    <button class="p-4 rounded-md bg-red-300" @click="activatePara">Click to change</button>

  </div>
</template>

<script>
import { ref, watch, reactive, toRefs } from 'vue'
import SearchResults from "@/components/SearchResults.vue";
export default {
  components: {
    SearchResults,
  },
  // setup() is the core of CAPI
  setup() {
    const query = ref('') // make reactive and set initial val
    const reset = () => query.value = '' // query is a proxy object
    const gitUser = ref(null) // template ref
    const submitGitUser = ref(null)
    const state = reactive({data: []}) // example of using reactive (must import); will get unpacked via spread operator in return {} with toRefs
    const para = ref(null); // this will reference a DOM paragraph
    const dogName = ref('Scruffy')
    watch(async () => {
      if (!submitGitUser.value) return
      const response = await fetch(`https://api.github.com/users/${submitGitUser.value}/repos`)
      const repos = await response.json()
      console.log(repos[0].name)
      state.data = repos
    })
    const activatePara = () => {
      // para.value.textContent = 'Hi. I\'m Chuck and I\'m here to dance.'
      dogName.value = 'Nelly'
      para.value.classList.add('danger') // can't seem to add tailwind here....
      console.log(para.value)
    }
    return {query, reset, gitUser, submitGitUser, ... toRefs(state,), para, activatePara, dogName // ...toRefs(): unpack state so that .data can be used in template

    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myBtn:hover {
  cursor: pointer;
}
.danger {
  background-color: goldenrod;
}
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
