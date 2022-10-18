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
                        <input type="number" id="height" name="height" placeholder="Height in cm" class="input" min="30" max="240" v-model="height">
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="gender" name="gender" placeholder="Gender" class="input" v-model="gender">
                    </div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4">
                        <input type="text" id="weight" name="weight" placeholder="Body Weight in kg" class="input" v-model="weight">
                    </div>
                    <div class="col-md-4">
                        <input type="text" id="bodyFat" name="bodyFat" placeholder="Body Fat in %" class="input" v-model="bodyFat">
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
      height: null,
      gender: '',
      weight: '',
      bodyFat: '',
      goal: '',
      error: ''
    }
  },
  methods: {
    signUp() {
      const correctInput = this.checkInput()
      const createUser = {
        Email: this.email,
        Password: this.password,
        Name: this.name,
        BodyInfo: {
          Gender: this.gender,
          BodyWeight: this.weight,
          BodyFat: this.bodyFat,
          Age: this.age,
          Height: this.height,
          Goal: this.goal
        }
      }
      const loginUser = {
        Email: this.email,
        Password: this.password
      }
      if (correctInput === true) {
        Api.post('/users', createUser).then(
          (res) => {
            if (res.status !== 201) {
              this.$bvModal.msgBoxOk('Account creation was not successful')
            } else {
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
          },
          (err) => {
            this.error = err.response.data.error
            this.$bvModal.msgBoxOk('Account creation was not successful')
          }
        )
      }
    },
    checkInput() {
      console.log('checking input')
      if (this.email === '') {
        this.$bvModal.msgBoxOk('Please give a valid email adress')
        return false
      }
      if (this.password === '') {
        this.$bvModal.msgBoxOk('Please enter a password')
        return false
      }
      if (this.name === '') {
        this.$bvModal.msgBoxOk('Please enter a name')
        return false
      }
      if (this.gender === '') {
        this.$bvModal.msgBoxOk('Please enter your gender')
        return false
      }
      if (this.weight === '') {
        this.$bvModal.msgBoxOk('Please enter your weight in kg')
        return false
      }
      if (this.bodyFat === '' || this.bodyFat < 3 || this.bodyFat > 40) {
        this.$bvModal.msgBoxOk('Please enter your Body Fat Percentage (between 3 and 40)')
        return false
      }
      if (this.age === '' || this.age < 0 || this.age > 140) {
        this.$bvModal.msgBoxOk('Please enter a valid Age')
        return false
      }
      if (this.height === '' || this.height < 30 || this.height > 240) {
        this.$bvModal.msgBoxOk('Please enter a valid height')
        return false
      }
      if (this.goal === '') {
        this.$bvModal.msgBoxOk('Please enter the goal you want to achieve with the help of our app')
        return false
      }
      return true
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
