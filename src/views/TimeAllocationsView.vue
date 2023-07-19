<template>
  <h1 class="text-6xl" >Time Allocations</h1>
  <div class="container flex flex-col justify-center items-center h-screen w-3/4 mx-auto bg-amber-200 ">
    <table class="h-3/4 w-full bg-blue-950 text-amber-50 py-4 rounded-xl">
      <thead>
      <tr>
        <th v-for="(allocKey, idx) in allocationsKeys" :key="idx" >{{allocKey}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(allocation, idx) in allocations" :key="idx">
        <td>{{allocation.developer}}</td>
        <td>{{allocation.date}}</td>
        <td>{{allocation.time}}</td>
        <td>{{allocation.comment}}</td>
        <td>{{allocation.timerTotalTime}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import {ref, computed, onBeforeMount} from "vue";

const allocations= ref([{}])
const allocationsKeys = computed(() => Object.keys(allocations.value[0]))
// const allocationsKeys = ref(['Developer', 'Date', 'Hours', 'Comments', 'Total Time' ])
const isBestSelling = (ibs) => {
  return ibs ? 'Yes' : 'No'
}
onBeforeMount(async () => {
  console.log('trying to mount')
  try {
    let resp = await fetch('http://127.0.0.1:8000/books/api/timeboss/allocations', {
      method: 'GET'
    })
    let data = await resp.json()
    // if errors
    if (!resp.ok) {
      let respErrors = await resp.json()
      throw Error(`404: Response Errors: ${respErrors}`)
    }
    // no errors
    allocations.value = data.allocations
    console.log('mounted allocations: ', allocations.value)
  } catch(err) {
    console.log(err.message)
  }
})

</script>

<style scoped>

</style>