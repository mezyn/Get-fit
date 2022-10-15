<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <img src="@/assets/Logo.png" alt="logo" width="50%" />
        <b-jumbotron header="Welcome to GET FIT!" lead="Please fill up the following information to create an account. You will be able to edit it later">
            <form @submit.prevent="signUp">
                <div class="row">
                    <div class="col-md-4">
                        Account Information:
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="email" name="email" placeholder="Email" class="input" v-model="email">
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="password" name="password" placeholder="Password" class="input" v-model="password">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        Personal Information:
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="name" name="name" placeholder="Name" class="input" v-model="name">
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="age" name="age" placeholder="Age" class="input" v-model="age">
                    </div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <input type="text" id="height" name="height" placeholder="Height" class="input" v-model="height">
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="gender" name="gender" placeholder="Gender" class="input" v-model="gender">
                    </div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <input type="text" id="weight" name="weight" placeholder="Body Weight" class="input" v-model="weight">
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="bodyFat" name="bodyFat" placeholder="Body Fat Percentage" class="input" v-model="bodyFat">
                    </div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <input type="text" id="goal" name="goal" placeholder="Goal" class="input" v-model="goal">
                    </div>
                </div>
                <br>
                <b-button href="#" variant="info" @click="signUp">Create Account</b-button>
            </form>
        </b-jumbotron>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'signUp',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      age: '',
      height: '',
      gender: '',
      weight: '',
      bodyFat: '',
      goal: '',
      error: ''
    }
  },
  methods: {
    signUp() {
      const createUser = {
        Email: this.email,
        Password: this.password,
        Name: this.name,
        BodyInfo: {
          Age: this.age,
          Height: this.height,
          Gender: this.gender,
          BodyWeight: this.weight,
          BodyFat: this.bodyFat,
          Goal: this.goal
        }
      }
      const loginUser = {
        Email: this.email,
        Password: this.password
      }
      Api.post('/users', createUser).then(
        (res) => {
          if (res.status !== 201) {
            this.$bvModal.msgBoxOk('Account creation was not successful')
          }
        },
        (err) => {
          this.error = err.response.data.error
          this.$bvModal.msgBoxOk('Account creation was not successful')
        }
      )
      Api.post('/login', loginUser).then(
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
          this.$bvModal.msgBoxOk('Account creation was not successful')
        }
      )
    }
  }
}
</script>

<style>
.col-md-4{
    padding: 1%;
}
.row{
    padding-top: 2%;
}
.input{
    text-align: left;
    width: 100%;
}

@media only screen and (max-width: 768px)  {
  .col-md-4 {
    width: 100%;
    padding-bottom: 2%;
  }
}
</style>
