
<template>
  <h1 class="text-8xl" >Book Details</h1>

</template>

<script setup>



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