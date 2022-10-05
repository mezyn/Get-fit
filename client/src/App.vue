<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <menu-header/>
      <div id="nav">.</div>
      <div class="row">
        <div class="col-sm-auto bg-light sticky-top" id="menu">
          <h5>Menu</h5>
          <p>Here we can have a picture of the exercise</p>
          <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
            <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <router-link to="/user">Profile</router-link>
              </li>
              <li>
                <router-link to="/exercises" >Exercises</router-link>
              </li>
              <li>
                <router-link to="/saved-exercises" >Saved Exercises</router-link>
              </li>
              <li>
                <router-link to="/body-map" >Body Map</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm">
          <!-- Render the content of the current page view -->
          <router-view/>
        </div>
      </div>
    </div>
    <div v-else>
      <nav><router-link to="/sign-in">Sign In</router-link> | <router-link to="/sign-up">Sign Up</router-link></nav>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    // Define the name of the component here
    'menu-header': Header
  },
  data() {
    return {
      isLoggedIn: false,
      user: {}
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  background-color: #F5793B;
}
#menu {
  padding: 5%;
  background-color: #feeee7;
}
.link {
  background-color: white;
  stroke: #F5793B;
  padding: 5%;
}
</style>
