<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/emitters">Emitters</router-link> |
    <router-link to="/books-table">Books Table</router-link> |
    <router-link to="/add-book">Add Book</router-link> |
    <router-link to="/search">Search</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/vuex">Vuex</router-link> |


  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
