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
              <router-link to="/manage-exercises" >Manage Exercises</router-link>
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
      <div v-if="signIn">
        <sign-in @login="login()" />
        <button @click="switchToSignUp()">Sign up instead</button>
      </div>
      <div v-else>
        <sign-up @login="login()" />
        <button @click="switchToSignIn()">Sign in instead</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import signIn from './views/SignIn.vue'
import signUp from './views/SignUp.vue'
import Header from '@/components/Header.vue'

export default {
  components: {
    // Define the name of the component here
    'menu-header': Header,
    'sign-in': signIn,
    'sign-up': signUp
  },
  data() {
    return {
      isLoggedIn: true,
      user: {},
      signIn: true
    }
  },
  mounted() {
    this.$router.push('/login')
  },
  methods: {
    login() {
      this.isLoggedIn = true
      this.getUser()
      console.log(this.user)
      this.$router.push('/')
    },
    getUser() {
      Api.get('/user', {
        headers: { token: localStorage.getItem('token') }
      }).then((res) => {
        console.log(res.data.user._id)
        this.user = res.data.user._id
      })
    },
    switchToSignUp() {
      this.signIn = false
    },
    switchToSignIn() {
      this.signIn = true
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
