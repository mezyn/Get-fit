<!--For now, it's showing all exercise info.
We need to implement how to specify user and update the details in the code, but they'll look something like this.-->
<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="Exercises" lead="You're seeing all exerciese"></b-jumbotron>
        <div>
                <div v-for="exercise in Exercises" v-bind:key="exercise._id">
                    <exercise-block v-bind:exercise="exercise" v-on:save-exercise="saveExercise"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import ExerciseBlock from '@/components/ExerciseBlock.vue'

export default {
  name: 'exercises',
  components: {
    ExerciseBlock
  },
  mounted() {
    console.log('PAGE is loaded')
    // Load the real exercises from the server
    Api.get('/exercises')
      .then(response => {
        this.Exercises = response.data.exercises
      })
      .catch(error => {
        console.errer(error)
        this.Exercises = []
        // TO DO: send a error message
      })
      .then(() => {
        // This code is always executed at the end. After success or failure. (optional)
      })
  },
  data() {
    return {
      Exercises: [
      ]
    }
  },
  methods: {
    saveExercise(id) {
      Api.post(`/users/${user_id}/exercises/${exercise_id}`)
        .then(response => {
          const index = this.exercises.findIndex(exercise => exercise._id === id)
          this.exercises.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
