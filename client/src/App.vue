<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <menu-header/>
      <div>
        <b-navbar toggleable="lg" type="dark">
          <b-navbar-brand router-link class="nav-link" to="/">
              <b-icon icon="house-door-fill" aria-hidden="true"></b-icon>
            </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <router-link class="nav-link" to="/body-map" >Body Map</router-link>
                <router-link class="nav-link" to="/exercises" >Exercises</router-link>
                <div v-if="isAdmin">
                  <router-link class="nav-link" to="/manage-exercises" >Manage Exercises</router-link>
                </div>
              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  <b-icon icon="person-circle" aria-hidden="true"></b-icon>
                </template>
                <b-dropdown-item router-link class="nav-link" to="/user" v-bind:userId="this.user">Profile</b-dropdown-item>
                <b-dropdown-item router-link class="nav-link" to="/my-exercises">My exercise</b-dropdown-item>
                <b-dropdown-item router-link class="nav-link" to="/login" v-on:click="logOut()">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
          <!-- Render the content of the current page view -->
          <router-view v-bind:user="user" />
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
      isLoggedIn: false,
      user: {},
      signIn: true,
      isAdmin: false
    }
  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.isLoggedIn = false
      this.$router.push('/login')
    } else {
      this.isLoggedIn = true
      this.getUser()
    }
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
        if (this.user === '634abf91ce7e23649bccca1b') {
          console.log('admin logged in')
          this.isAdmin = true
        }
      })
    },
    switchToSignUp() {
      this.signIn = false
    },
    switchToSignIn() {
      this.signIn = true
    },
    logOut() {
      localStorage.setItem('token', null)
      this.isLoggedIn = false
      this.user = {}
      localStorage.clear()
      this.$router.push('/login')
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
  padding: 1rem 1.5rem;
  background-color: #F5793B;
}
.nav-link{
    font-size: 1rem;
    font-weight: 500;
    color: #475569;
}
.navbar {
  font-style: bold;
  background-color: #F5793B;
  font-family: Arial, sans-serif;
  font-weight: 400;
}
.navbar-nav {
  margin-left: 30px;
  margin-right: 30px;
}

</style>
