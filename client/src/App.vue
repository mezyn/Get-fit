<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <menu-header/>
      <div id="nav">.</div>
        <div class="row">
          <div class="col-3">
            <nav class="navbar">
                <div class="col-sm bg-light sticky-top" id="menu">
                  <!-- Collapse button -->
                  <b-navbar toggleable type="light" variant="light">
                    <b-navbar-brand href="#">NavBar</b-navbar-brand>
                    <b-navbar-toggle target="navbar-toggle-collapse">
                      <template #default="{ expanded }">
                        <b-icon v-if="expanded" icon="chevron-double-up"></b-icon>
                        <b-icon v-else icon="chevron-double-down"></b-icon>
                      </template>
                    </b-navbar-toggle>
                    <b-collapse id="navbar-toggle-collapse" is-nav>
                      <b-navbar-nav class="ml">
                        <router-link class="nav-link" to="/">Home</router-link>
                        <router-link class="nav-link" to="/user">Profile</router-link>
                        <router-link class="nav-link" to="/body-map" >Body Map</router-link>
                        <router-link class="nav-link" to="/exercises" >Exercises</router-link>
                        <router-link class="nav-link" to="/manage-exercises" >Manage Exercises</router-link>
                        <router-link class="nav-link" to="/" >Placeholder for logout</router-link>
                      </b-navbar-nav>
                    </b-collapse>
                  </b-navbar>
              </div>
            </nav>
          </div>
        <div class="col-9">
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
  padding: 1rem 1.5rem;
  background-color: #F5793B;
}
#menu {
  padding: 5%;
  background-color: #feeee7;
}
.nav-link{
    font-size: 1rem;
    font-weight: 400;
    color: #475569;
}

@media only screen and (max-width: 540px) {
    .navbar {
        position: fixed;
        float: left;
        left: -100%;
        top:0%;
        flex-direction: column;
        background-color: thistle;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        text-align: center;
        transition: 0.3s;
        box-shadow:
            0 10px 27px rgba(0, 0, 0, 0.05);
        display:;
    }

}

</style>
