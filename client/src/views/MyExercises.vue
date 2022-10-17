<!--For now, it's showing all exercise info.
We need to implement how to specify user and update the details in the code, but they'll look something like this.-->
<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="My Exercises" lead="All exercises I'm interested"></b-jumbotron>
        <div id = "exerciseBox">
            <div id="myExercises" v-for="exercise in myExercises" v-bind:key="exercise._id">
                <exercise-block v-bind:exercise="exercise"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import ExerciseBlock from '@/components/ExerciseBlock.vue'

export default {
  name: 'MyExercises',
  components: {
    ExerciseBlock
  },
  props: {
    user: String
  },
  mounted() {
    const userId = this.user
    Api.get(`/users/${userId}/saved-exercises`)
      .then(response => {
        this.myExercises = response.data
      })
      .catch(error => {
        console.error(error)
        this.myExercises = []
        // TO DO: send a error message
      })
      .then(() => {
        // This code is always executed at the end. After success or failure. (optional)
      })
  },
  data() {
    return {
      myExercises: [
      ]
    }
  }
}
</script>

<style scoped>

#myExercises {
  padding-bottom: 20px;
}

@media only screen and (max-width: 768px)  {
  #exerciseBox {
    width: 100%;
    padding-bottom: 2%;
  }
}
</style>>
