<template>
  <h1 class="text-8xl" >Add Book</h1>

  <div v-if="submitSuccess" @click="modalDismiss" class="modal flex flex-col justify-center w-full ">
    <h1 class="text-8xl text-amber-50 block ">Submission Successful</h1>
  </div>
  <form @submit.prevent="" class="max-w-2xl bg-amber-100 mx-auto p-8 my-8 flex flex-col justify-around items-start rounded-2xl">
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
        <input v-model="author" type="text" />
      </div>
    </div>
    <div class="formControl">
      <label>Rating</label>
      <div class="validation">
        <p v-if="validationErrors.title">{{validationErrors.rating}}</p>
        <select v-model="rating">
          <option value="1" >1</option>
          <option value="2" >2</option>
          <option value="3" >3</option>
          <option value="4" >4</option>
          <option value="5" >5</option>
        </select>
      </div>
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
    <div class="formControl">
      <label>Picture Upload</label>
      <div class="validation">
        <div v-if="fileUploadErrors.length > 0">
          <p v-for="(error, idx) in fileUploadErrors" :key="idx"><span>{{error}}</span></p>
        </div>
        <input type="file" @change="handleFileUpload" />
      </div>
    </div>
    <div class="formControl submitFC">
      <button @click="handleSubmitForm" class="block bg-white py-2 px-4 rounded-md">Submit</button>
      <button class="block bg-white py-2 px-4 rounded-md">Cancel</button>
    </div>
  </form>
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
  // import axios from "axios";
  import { BOOKS_API_ADD_BOOK } from '../utils/routes'
  import { ref, computed } from 'vue'
  import { useStore } from "vuex";

  const store = useStore()
  const accessToken = computed(() => store.getters['getAccessToken'])
  const title = ref('')
  const author = ref('')
  const rating = ref(null)
  const bestseller = ref('')
  const validationErrors = ref({
    title: [], author: [], rating: ''
  })
  const submitSuccess = ref(false) // show submit modal
  const imageFile = ref(null)
  const allowedFileSize = ref(8) // in Megabytes
  const fileUploadErrors = ref([])
  const modalDismiss = () => {
    submitSuccess.value = false
  }
  const handleFileUpload = (e) => {
    fileUploadErrors.value = [] // reset for each submission attempt
    if (!e.target.files[0]) return
    const file = e.target.files[0]

    if (Math.round(file.size / 1024 / 1024) > allowedFileSize.value) {
      fileUploadErrors.value.push('file upload size exceeded')
    }

    let is_ValidFileType = ['jpg', 'jpeg', 'png', 'gif'].includes(file.name.toLowerCase().split('.').pop())
    if (!is_ValidFileType) fileUploadErrors.value.push('invalid file type')

    // if there are errors, display and return
    if (fileUploadErrors.value.length > 0) {
      // console.log('file upload errors: ',fileUploadErrors.value)
      return
    }
    imageFile.value = file // transfer to ref
  }
  const handleSubmitForm = async () => {
    if (!rating.value) {
      validationErrors.value.rating = 'Please Enter a Rating'
      return
    }
    let is_bestselling
    bestseller.value == 'Yes'? is_bestselling = true : is_bestselling = false

    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('author', author.value)
    formData.append('is_bestselling', is_bestselling)
    formData.append('rating', rating.value)
    if (imageFile.value) formData.append('file', imageFile.value)

    try {
      const response = await fetch(BOOKS_API_ADD_BOOK, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${accessToken.value}`
        }
        // headers: {
        //   'Content-Type': 'application/json', // not with formData, just with normal data obj
        // },
        // body: JSON.stringify(data),
      })
    //   AXIOS in case somebody wants a progress bar. But the goddam 400 return without messages is wasting my time
    //   const response = await axios('http://127.0.0.1:8000/books/api', {
    //     method:'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     data: data,
    //   })
    //   console.log('fuck axios')
    //   if (response.error) console.log("reponse.error ", response.error)
      const postResponse = await response.json() // get the error messages from django
      if (!response.ok) {
        validationErrors.value = postResponse // populate and activate the errors in template
        console.log(validationErrors.value)
        throw Error('404: failed to post data')
      }
      // no errors from server
      submitSuccess.value = true
      console.log('postResponse after posting: ', postResponse)
      validationErrors.value = {title: [], author: [], rating: []} // reset otherwise error in template
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