<!--For now, it's showing all exercise info.
We need to implement how to specify user and update the details in the code, but they'll look something like this.-->
<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="Manage Exercises" lead="For now, they're all exercises in the database. So if you delete them they'll be totally gone from the DB"></b-jumbotron>
        <div>
            <new-exercise/>
                <div v-for="exercise in savedExercises" v-bind:key="exercise._id">
                    <saved-exercise-block v-bind:exercise="exercise" v-on:del-exercise="deleteExercise" v-on:patch-exercise="patchExercise"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import SavedExerciseBlock from '@/components/SavedExerciseBlock.vue'
import NewExercise from '@/components/NewExercise.vue'

export default {
  name: 'manageExercises',
  components: {
    SavedExerciseBlock,
    NewExercise
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
      Api.delete(`/exercises/${id}`)
        .then(response => {
          const index = this.savedExercises.findIndex(exercise => exercise._id === id)
          this.savedExercises.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    },
    patchExercise(id) { // need to fix
      Api.patch(`/exercises/${id}`)
        .then(response => {
          const index = this.savedExercises.findIndex(exercise => exercise._id === id)
          this.savedExercises.splice(index, 1)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
