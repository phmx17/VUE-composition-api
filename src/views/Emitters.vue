<template>
  <div>
    <h1 class="text-xl">Emitters</h1>
    <EmitterButton @subscribe-event="subscribeSubmit" class="p-4 rounded-md bg-green-300 text-red-300 font-semibold " />
    <p v-if="subscribeMessage">{{subscribeMessage}}</p>
  </div>
  <div class="my-6 flex justify-around" >
    <button @click="bgColor = 'bg-blue-300'" class="p-4 rounded-md bg-blue-300 text-white font-semibold ">Take the blue pill</button>
    <button @click="bgColor = 'bg-red-300'" class="p-4 rounded-md bg-red-300 text-white font-semibold ">Take the red pill</button>
  </div>
  <RedPillBluePill :class="bgColor" id="12" />

</template>

<script setup>
  import EmitterButton from "@/components/EmitterButton.vue"
  import RedPillBluePill from "@/components/RedBluePill.vue"
  import {ref} from "vue";
  const bgColor = ref('bg-gray-300') // this can't override the component's css
  const subscribeMessage = ref(null)
  const subscribeSubmit = (test) => {
    subscribeMessage.value = test
  }

</script>