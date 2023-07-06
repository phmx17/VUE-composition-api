<template>
  <div>
    <p v-if="filteredCarsFilled" >Showing {{ filteredCars.length }} results for {{ query }}</p>
    <ul>
      <li v-for="car in filteredCars" :key="car.model">
        {{car.model}}
      </li>
    </ul>
  </div>
</template>

<script>
  import { computed } from "vue"
  import cars from '../postData.json'
  export default {
    name: 'SearchResults',
    props: {
      query: String
    },
    setup (props) {
      const filteredCars = computed(() => {
        if (props.query === '') return filteredCars
        return cars.filter((c) =>
           c.brand.toLowerCase().includes(props.query.toLowerCase())
        )
      })
      const filteredCarsFilled = computed(() =>
          filteredCars.value.length > 0) // simplified ternary expression
      return {
        filteredCars,
        filteredCarsFilled

      }

    }
  }
</script>