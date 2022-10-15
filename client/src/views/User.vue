<template>
    <div class="container">
        <div id="headline">
            <h1 class="header">Hello {{userInfo.Name}}!</h1>
            <p>Here you can view and edit all your personal information</p>
        </div>
        <form @submit.prevent="updateInformation">
            <div class="row inputs">
                <div class="col-6 col-md-4">
                    <label for="name" class="inputLabel">Name</label><br>
                    <input type="text" id="name" name="name" class="input" :placeholder="userInfo.Name" v-model="userInfo.Name">
                </div>
                <div class="col-6 col-md-4">
                    <label for="age" class="inputLabel">Age</label><br>
                    <input type="text" id="age" name="age" class="input" :placeholder="userInfo.BodyInfo.Age" v-model="userInfo.BodyInfo.Age">
                </div>
                <div class="col-6 col-md-4">
                    <label for="height" class="inputLabel">Height in cm</label><br>
                    <input type="text" id="height" name="height" class="input" :placeholder="userInfo.BodyInfo.Height" v-model="userInfo.BodyInfo.Height">
                </div>
                <div class="col-6 col-md-4">
                    <label for="gender" class="inputLabel">Gender</label><br>
                    <input type="text" id="gender" name="gender" class="input" :placeholder="userInfo.BodyInfo.Gender" v-model="userInfo.BodyInfo.Gender">
                </div>
                <div class="col-6 col-md-4">
                    <label for="weight" class="inputLabel">Weight in kg</label><br>
                    <input type="text" id="weight" name="weight" class="input" :placeholder="userInfo.BodyInfo.BodyWeight" v-model="userInfo.BodyInfo.BodyWeight">
                </div>
                <div class="col-6 col-md-4">
                    <label for="bodyFat" class="inputLabel">Body Fat in %</label><br>
                    <input type="text" id="bodyFat" name="bodyFat" class="input" :placeholder="userInfo.BodyInfo.BodyFat" v-model="userInfo.BodyInfo.BodyFat">
                </div>
                <div class="col-6 col-md-4">
                    <label for="goal" class="inputLabel">Goal</label><br>
                    <input type="text" id="goal" name="goal" class="input" :placeholder="userInfo.BodyInfo.Goal" v-model="userInfo.BodyInfo.Goal">
                </div>
                <div class="col-6 col-md-4">
                    <br>
                    <b-button href="#" class="submitButton" @click="updateInformation">Save update</b-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'user',
  props: {
    user: String
  },
  data() {
    return {
      userInfo: {
        Email: '',
        Password: '',
        Name: '',
        BodyInfo: {
          Gender: '',
          BodyWeight: '',
          BodyFat: '',
          Age: '',
          Height: '',
          Goal: ''
        },
        SavedExercises: [],
        AuthoredReviews: []
      }
    }
  },
  mounted() {
    Api.get(`/users/${this.user}`)
      .then(res => {
        console.log(res.data)
        this.userInfo = res.data
        console.log(this.userInfo)
      })
      .catch(err => {
        console.log('There was an error')
        console.error(err)
        this.$bvModal.msgBoxOk('This user could not be found.')
      })
  },
  methods: {
    updateInformation() {
      Api.patch(`/users/${this.user}`, this.userInfo)
        .then(res => {
          console.log(res.data)
          this.$bvModal.msgBoxOk('Your information was successfully updated')
        })
        .catch(err => {
          console.log('There was an error')
          console.error(err)
          this.$bvModal.msgBoxOk('This user could not be found.')
        })
    }
  }
}
</script>

<style>
.inputLabel {
    align-content: center;
}

input {
    padding-top: 1%;
}

.row.inputs {
    background-color: #feeee7;
    margin: 5%;
}

#headline {
    padding-top: 5%;
}

h1.header {
    font-size: 300%;
}
</style>
