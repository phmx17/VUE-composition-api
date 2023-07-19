
<h1 class="text-8xl" >Time Boss</h1>

<template>
  <h1 class="text-8xl" >Time Boss</h1>
  <div v-if="submitSuccess" @click="modalDismiss" class="modal flex flex-col justify-center w-full ">
    <h1 class="text-8xl text-amber-50 block ">Submission Successful</h1>
  </div>
  <form @submit.prevent="" class="max-w-2xl bg-amber-100 mx-auto p-8 my-8 flex flex-col justify-around items-start rounded-2xl">

      <div class="searchBox h-1/2 w-full bg-blue-950 text-amber-50 p-4 rounded-xl ">
        <label class="block text-2xl my-2 font-medium ">Enter Your Dev Name</label>
        <input class="  text-2xl bg-blue-950 rounded-md " type="text" placeholder="enter name" v-model="nameInput" autofocus />
        <!--        <button class="bg-blue-800 rounded-md p-2 " >go!</button>-->
        <ul v-if="existSearchResults" class="w-1/2 mx-auto" v-for="(user, idx) in searchResults" :key="idx">
          <li  @click="selectName(idx)" class="listItem text-2xl" >{{user[0]}}</li>
        </ul>

    </div>
<!--    <div class="formControl">-->
<!--      <label>DevName</label>-->
<!--      <div class="validation">-->
<!--&lt;!&ndash;        <p v-if="validationErrors.title">{{validationErrors.rating}}</p>&ndash;&gt;-->
<!--        <select v-model="DevName">-->
<!--          <option value="1" >1</option>-->
<!--          <option value="2" >2</option>-->
<!--          <option value="3" >3</option>-->
<!--          <option value="4" >4</option>-->
<!--          <option value="5" >5</option>-->
<!--        </select>-->
<!--      </div>-->
<!--    </div>-->
    <div class="formControl">
      <label>Project Title</label>
      <div class="validation">
<!--        <p v-if="validationErrors.projectTitle">{{validationErrors.projectTitle[0]}}</p>-->
        <input v-model="projectTitle" type="text" />
      </div>
    </div>
    <div class="formControl">
      <label>Date Worked on</label>
      <div class="validation">
<!--        <p v-if="validationErrors.author">{{validationErrors.author[0]}}</p>-->
        <input v-model="dateWorkedOn" type="datetime-local" />
      </div>
    </div>
    <div class="formControl">
      <label>Time Worked on</label>
      <div class="validation">
<!--        <p v-if="validationErrors.author">{{validationErrors.author[0]}}</p>-->
        <input v-model="timeWorkedOn" type="number" />
      </div>
    </div>
    <div class="formControl">
      <label>Comments</label>
      <div class="validation">
<!--        <p v-if="validationErrors.author">{{validationErrors.author[0]}}</p>-->
        <input v-model="Comments" type="text" />
    </div>
  </div>


    <div class="formControl submitFC">
      <button @click="handleSubmitForm" class="block bg-white py-2 px-4 rounded-md">Submit</button>
      <button class="block bg-white py-2 px-4 rounded-md">Cancel</button>
    </div>
  </form>
  <p>devName: {{devName}} | projectTitle: {{projectTitle}} | Rating: {{rating}} | Bestseller: {{bestseller}}</p>
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
import {ref} from 'vue'

const devName = ref('')
const projectTitle= ref('')
const dateWorkedOn = ref(null)
const timeWorkedOn = ref('')
const comments = ref('')
const validationErrors = ref({
  devName: [], projectTitle: [], rating: ''
})
const submitSuccess = ref(false) // show submit modal
const imageFile = ref({})
const allowedFileSize = ref(8) // in Megabytes
const fileUploadErrors = ref([])
const modalDismiss = () => {
  submitSuccess.value = false
}

const handleSubmitForm = async () => {
  // if (!rating.value) {
  //   validationErrors.value.rating = 'Please Enter a Rating'
  //   console.log('a rating is required')
  //   return
  // }
  let is_bestselling
  // bestseller.value == 'Yes'? is_bestselling = true : is_bestselling = false

  const formData = new FormData()
  formData.append('developer', nameResult.value)
  formData.append('date', dateWorkedOn.value)
  formData.append('time', timeWorkedOn.value )
  formData.append('comment', comments.value)
  // formData.append('timerTotalTime', )

  try {
    const response = await fetch('http://127.0.0.1:8000/books/api/timeboss/allocations', {
      method: 'POST',
      body: formData
      // headers: {
      //   'Content-Type': 'application/json', // not with formData, just with normal data obj
      // },
      // body: JSON.stringify(data),
    })

    if (!response.ok) {
      const postResponse = await response.json() // get the error messages from django
      validationErrors.value = postResponse // populate and activate the errors in template
      console.log(validationErrors.value)
      throw Error('404: failed to post data')
    }
    // no errors from server
    submitSuccess.value = true
    validationErrors.value = {devName: [], projectTitle: [], rating: []} // reset otherwise error in template
  } catch(err) {
    console.log(err.message)
  }
}

// Get User Autocomplete
import {watch, computed} from "vue";
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
  // finalName.value = nameResult.value // place into search input; doesn't work since it repopulates everything again
  existSearchResults.value = false

  searchResults.value = []
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

/* for name autocomplete */
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



<style scoped>

</style>


<!--    <div class="formControl">-->
<!--      <label>Rating</label>-->
<!--      <div class="validation">-->
<!--        <p v-if="validationErrors.title">{{validationErrors.rating}}</p>-->
<!--        <select v-model="rating">-->
<!--          <option value="1" >1</option>-->
<!--          <option value="2" >2</option>-->
<!--          <option value="3" >3</option>-->
<!--          <option value="4" >4</option>-->
<!--          <option value="5" >5</option>-->
<!--        </select>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="formControl">-->
<!--      <label>Bestseller</label>-->
<!--      <div class="formControl radioFC" >-->
<!--        <div class="flex" >-->
<!--          <label class="radioBtn">Yes</label>-->
<!--          <input v-model="bestseller" type="radio" value="Yes" class="radioBtn" />-->
<!--        </div>-->
<!--        <div class="flex" >-->
<!--          <label class="radioBtn">No</label>-->
<!--          <input v-model="bestseller" type="radio" value="No" class="radioBtn" />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="formControl">-->
<!--      <label>Picture Upload</label>-->
<!--      <div class="validation">-->
<!--        <div v-if="fileUploadErrors.length > 0">-->
<!--          <p v-for="(error, idx) in fileUploadErrors" :key="idx"><span>{{error}}</span></p>-->
<!--        </div>-->
<!--        <input type="file" @change="handleFileUpload" />-->
<!--      </div>-->
<!--    </div>-->