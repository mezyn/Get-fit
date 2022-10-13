<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <img src="@/assets/Logo.png" alt="logo" width="50%" />
        <b-jumbotron header="Welcome back!" lead="Please sign in with you email address and your password.">
            <br>
            <form @submit.prevent="signIn">
              <input type="text" id="email" name="email" placeholder="Email" size="40" v-model="email"><br><br>
              <input type="text" id="password" name="passwork" placeholder="Password" size="40" v-model="password"><br><br>
              <b-button href="#" variant="info" @click="signIn">Log in</b-button>
            </form>
        </b-jumbotron>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'signIn',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    signIn() {
      const user = {
        Email: this.email,
        Password: this.password
      }
      Api.post('/login', user).then(
        (res) => {
          // if successfull
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            this.$emit('login', true)
          }
        },
        (err) => {
          console.log(err.response)
          this.error = err.response.data.error
          this.boxOne = ''
          this.$bvModal.msgBoxOk('Invalid Credentials')
        }
      )
    }
  }
}
</script>
