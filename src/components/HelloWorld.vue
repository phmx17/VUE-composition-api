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
        <li v-for="(repo, idx) in state.data" :key="repo.id">
          {{idx}}: {{repo.name }}
        </li>
      </ul>
    </div>
  </div>
  <div class="text-xl font-mono flex flex-col justify-center bg-blue-200 items-center" >
    <h1 class="my-3" > Let's check out a reference to a DOM element</h1>
    <p class="bg-red-300 myBtn my-3 p-2" ref="para" @click="activatePara" >Hi. I am little {{dogName}}</p>
    <button class="p-4 rounded-md bg-red-300" @click="activatePara">Click to switch Names</button>
    <button class="p-4 rounded-md bg-green-300" @click="quitWatchingDogNames">Stop Watching Dog Names</button>
  </div>
</template>

<script setup>
import { ref, watchEffect, watch, reactive } from 'vue' // watchEffect() differs from watch() in that it can contain refs anywhere in code block, not just as param.
import SearchResults from "@/components/SearchResults.vue";

  // setup() is the core of CAPI

    const query = ref('') // make reactive to template; this replaces data() in OAPI
    const reset = () => query.value = '' // query is a proxy object
    const gitUser = ref(null) // template ref
    const submitGitUser = ref(null)
    const state = reactive({data: []}) // reactive does not support primitive types! this gets unpacked via spread operator in return {} with toRefs
    const para = ref(null); // this will reference a DOM paragraph
    const dogNameSelection = ['Scruffy', 'Nelly', 'Pickles', 'Nibbles', 'Pizmo']
    const dogName = ref('Scruffy')
    // gets triggered when ref submitGitUser changes and also on component initial load
    watchEffect(async () => {
      if (!submitGitUser.value) return
      try {
        const response = await fetch(`https://api.github.com/users/${submitGitUser.value}/repos`)
        if (!response.ok) throw Error('no data available') // response and throw error
        state.data = await response.json() // await == convert the promise
        if (state.data.length === 0) throw Error('User not found') // api returns [] when no user found
      } catch(err) {
        console.log('error on fetch: ', err.message) // thrown Error
      }
    })
    // watch() demo and how to disable watching
    const watchDemo = watch(dogName, () => console.log('watching dog names.....'))
    const quitWatchingDogNames = () => watchDemo() // disable
    const activatePara = () => {
      dogName.value = dogNameSelection[Math.floor(Math.random() * dogNameSelection.length)]
      para.value.classList.add('danger') // can't seem to add tailwind here....
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
