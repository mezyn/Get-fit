<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="Saved Exercises" lead="For now, they're all exercises in the database. So if you delete them they'll be totally gone from the DB"></b-jumbotron>
        <div id = "exerciseBox">
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
    Api.get('/exercises')
      .then(response => {
        this.savedExercises = response.data.exercises
      })
      .catch(error => {
        console.error(error)
        this.savedExercises = []
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
          window.confirm('Successfully deleted')
        })
        .catch(error => {
          console.error(error)
          if (error.response.status === 404) {
            window.confirm('Could not find the exercise')
          } else {
            window.confirm('Request failed due to internal server error.')
          }
        })
        .then(() => {
          window.location.reload()
        }
        )
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px)  {
  #exerciseBox {
    width: 100%;
    padding-bottom: 2%;
  }
}
</style>>
