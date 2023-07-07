<template>
<!--  inline like this-->
<!--  <button @click="$emit('subscribeEvent', true)">Click here to Subscribe</button>-->
  <button @click="subscribeEvent">Click here to Subscribe</button>
</template>

<script>

export default {
  name: "EmitterButton",
  setup(props, context) {
    const subscribeEvent = () => {
      context.emit('subscribeEvent', 'Welcome Friend!') // emitting to parent
    }



    return {subscribeEvent}

  },
}
</script>

<style scoped>

</style>