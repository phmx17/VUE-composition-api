<template>
  <h1 class="text-6xl">Login</h1>
  <form @submit.prevent="" class="max-w-2xl bg-amber-100 mx-auto p-8 my-8 flex flex-col justify-around items-start rounded-2xl" >
    <div class="formControl" >
      <label>Username</label>
      <div class="validation">
<!--        <p v-if="validationErrors.title">{{validationErrors.title[0]}}</p>-->
        <input v-model="username" type="text" />
      </div>
    </div>
    <div class="formControl">
      <label>Password</label>
      <div class="validation">
<!--        <p v-if="validationErrors.author">{{validationErrors.author[0]}}</p>-->
        <input v-model="password" type="text" />
      </div>
    </div>
    <div class="formControl submitFC">
      <button @click="handleSubmitForm" class="block bg-white py-2 px-4 rounded-md">Submit</button>
    </div>
  </form>
      <button @click="handleLogoutCurrent" class="block bg-red-500 text-white font-bold  py-2 px-4 rounded-md mx-auto">Logout Current</button>
</template>

<script setup>
  import { API_LOGIN } from '@/utils/routes'
  import { ref, computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  const accessToken = computed(() => store.state.accessToken)
  const username = ref('')
  const password = ref('')

  const handleSubmitForm = async () => {
    const formData = new FormData()
    formData.append('username', username.value)
    formData.append('password', password.value)

    try {
      const response = await fetch(API_LOGIN, {
        method: 'POST',
        body: formData
      })
      const postResponse = await response.json()
      if (!response.ok) {
        // validationErrors.value = postResponse // populate and activate the errors in template
        console.log('postResponse: ', postResponse )
        throw Error('404: failed to post data')
      }
      // no errors from server
      store.dispatch('addAccessToken', postResponse.access) // dispatch to vuex store
      console.log('accessToken: ', accessToken.value)

      // submitSuccess.value = true
      // validationErrors.value = {title: [], author: [], rating: []} // reset otherwise error in template
    } catch(err) {
      console.log(err.message)
    }


  }
  const handleLogoutCurrent = () => {
    store.dispatch('addAccessToken', '') // dispatch to vuex store
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