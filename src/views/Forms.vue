<template>
  <div v-if="submitSuccess" @click="modalDismiss" class="modal flex flex-col justify-center w-full ">
    <h1 class="text-8xl text-amber-50 block ">Submission Successful</h1>
  </div>
  <form class="max-w-2xl bg-amber-100 h-96 mx-auto p-8 my-8 flex flex-col justify-around items-start rounded-2xl">
    <div class="formControl" >
      <label>Title</label>
      <div class="validation">
        <p v-if="validationErrors.title">{{validationErrors.title[0]}}</p>
        <input v-model="title" type="text" />
      </div>
    </div>
    <div class="formControl">
      <label>Author</label>
      <div class="validation">
        <p v-if="validationErrors.author">{{validationErrors.author[0]}}</p>
        <input v-model="author" type="email" />
      </div>
    </div>
    <div class="formControl">
      <label>Rating</label>
      <select v-model="rating">
        <option value="1" >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>
      </select>
    </div>
    <div class="formControl">
      <label>Bestseller</label>
      <div class="formControl radioFC" >
        <div class="flex" >
          <label class="radioBtn">Yes</label>
          <input v-model="bestseller" type="radio" value="Yes" class="radioBtn" />
        </div>
        <div class="flex" >
          <label class="radioBtn">No</label>
          <input v-model="bestseller" type="radio" value="No" class="radioBtn" />
        </div>
      </div>
    </div>
  </form>
    <div class="formControl submitFC">
      <button @click="handleSubmitForm" class="block bg-white py-2 px-4 rounded-md">Submit</button>
      <button class="block bg-white py-2 px-4 rounded-md">Cancel</button>
    </div>


  <p>Title: {{title}} | Author: {{author}} | Rating: {{rating}} | Bestseller: {{bestseller}}</p>
  <div class="errorMessages">
    <ul>
      <li v-for="(errVal, errKey, idx) in validationErrors" :key="idx">
        {{errKey}} : {{errVal[0]}}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import {ref} from 'vue'

  const title = ref('')
  const author = ref('')
  const rating = ref(null)
  const bestseller = ref('')
  const validationErrors = ref({
    title: [], author: []
  })
  const submitSuccess = ref(false) // show submit modal
  const modalDismiss = () => {
    submitSuccess.value = false
  }
  const handleSubmitForm = async () => {
    let is_bestselling
    bestseller.value == 'Yes'? is_bestselling = true : is_bestselling = false

    const data = {
      title: title.value,
      author: author.value,
      rating: rating.value,
      is_bestselling
    }
    console.log('data before sending: ', data)
    try {
      const response = await fetch('http://127.0.0.1:8000/books/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const postResponse = await response.json()
        // console.log('error responses from server: ', postResponse)
        validationErrors.value = postResponse
        throw Error('404: failed to post data')
      }
      // no errors from server
      submitSuccess.value = true
      validationErrors.value = {title: [], author: []} // reset otherwise error in template
    } catch(err) {
      console.log(err.message)

    }
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