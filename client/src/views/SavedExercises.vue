<!--For now, it's showing all exercise info.
We need to implement how to specify user and update the details in the code, but they'll look something like this.-->
<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="Saved Exercises" lead="For now, they're all exercises in the database. So if you delete them they'll be totally gone from the DB"></b-jumbotron>
        <div>
            <div v-for="exercise in savedExercises" v-bind:key="exercise._id">
                <saved-exercise-block v-bind:exercise="exercise" v-on:del-exercise="deleteExercise"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import SavedExerciseBlock from '@/components/SavedExerciseBlock.vue'

export default {
  name: 'savedExercises',
  components: {
    SavedExerciseBlock
  },
  mounted() {
    console.log('PAGE is loaded')
    // Load the real exercises from the server
    Api.get('/exercises') // For now we have this path. Later we should change it like '/users/:user_id/exercises'
      .then(response => {
        this.savedExercises = response.data.exercises
      })
      .catch(error => {
        console.error(error)
        this.savedExercises = []
        // TO DO: send a error message
      })
      .then(() => {
        // This code is always executed at the end. After success or failure. (optional)
      })
  },
  data() {
    return {
      savedExercises: [
      ]
    }
  },
  methods: {
    deleteExercise(id) {
      Api.delete(`/exercises/${id}`) // Same here. Should be fixed to '/users/:user_id/exercises/:exercise_id'
        .then(response => {
          const index = this.savedExercises.findIndex(exercise => exercise._id === id)
          this.savedExercises.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
        .then(() => {
          window.location.reload()
        }
        )
    }
  }
}
</script>
