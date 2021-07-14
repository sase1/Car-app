<template>
  <div id="nav" class="text-center">
    <router-link to="/">Home page</router-link> |
    <router-link to="/formPage">Form page</router-link> |
    <router-link to="/gridPage">Grid page</router-link>
  </div>
  <router-view/>
</template>

<style>

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
