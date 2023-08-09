<template>
  <h1 class="text-6xl">Vuex Testing</h1>
  <form @submit.prevent="" class="max-w-2xl bg-amber-100 mx-auto p-8 my-8 flex flex-col justify-around items-start rounded-2xl" >
    <div class="formControl" >
      <label>Data1</label>
      <div class="validation">
        <!--        <p v-if="validationErrors.title">{{validationErrors.title[0]}}</p>-->
        <input v-model="data1" type="text" />
      </div>
    </div>
    <div class="formControl">
      <label>Data2</label>
      <div class="validation">
        <!--        <p v-if="validationErrors.author">{{validationErrors.author[0]}}</p>-->
        <input v-model="data2" type="text" />
      </div>
    </div>
    <div class="formControl submitFC">
      <button @click="handleSubmitForm" class="block bg-white py-2 px-4 rounded-md">Submit</button>
      <button class="block bg-white py-2 px-4 rounded-md">Cancel</button>
    </div>
  </form>
  state: {{state.count}}
  access token: {{accessToken}}
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const accessToken = ref('')
  const state = computed(() => store.state)

  const data1 = ref('')
  const data2 = ref('')


  const handleSubmitForm = () => {
    // store.commit('increment') // launches the function in mutations
    // store.commit('addAccessToken', data1.value)
    store.dispatch('addAccessToken', data1.value) // dispatch is better than commit to add data to store
    accessToken.value = store.getters['getAccessToken'] // access getters
  }
</script>

<style scoped>
  form {
    z-index: -10;
  }
  label {
    margin-right: 2em;
  }
  input {
    padding: .5em;
    border-radius: .5em;
    width: 60%;
  }
  select {
    padding: .5em;
    border-radius: .5em;
    width: 60%;
  }
  .formControl {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1.5em 0
  }
  .radioFC {
    width: 60%;
    justify-content: space-around;
  }
  .radioBtn {
    display: inline-block;
  }
  .submitFC {
    justify-content: space-around;
    margin-top: 1em;
  }
  .validation {
    width: 60%;
  }
  .validation input {
    width: 100%;
  }
  .validation p {
    color: orangered;
    text-align: start;
  }
  .modal {
    z-index: 1;
    height: 100vh;
    background-color: rgba(4,4,4,0.4);
    position: absolute;
    top: 0;
    cursor: pointer;
  }
</style>