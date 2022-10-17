<!--For now, it's showing all exercise info.
We need to implement how to specify user and update the details in the code, but they'll look something like this.-->
<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="Manage Exercises" lead="Here you can see all details about exercises as well as create, update and delete them"></b-jumbotron>
        <div id="exerciseBox">
          <b-row>
            <b-col>
              <new-exercise id="new-exercise"/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-card-group deck id="deck-cards">
                  <div id="saved-exercises" v-for="exercise in savedExercises" v-bind:key="exercise._id">
                      <saved-exercise-block v-bind:exercise="exercise" v-on:del-exercise="deleteExercise"/>
                  </div>
              </b-card-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button v-b-modal.deleteAllExercise variant="danger"><b-icon icon="exclamation-diamond-fill" aria-hidden="true"/>Delete all exercises</b-button>
              <b-modal id="deleteAllExercise" centered title="Delete all exercise" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
              <div>
                <p>Deletion of all exercises cannot be reverted. Are you sure you want to delete all the saved exercises?</p>
                <b-button variant="danger" v-on:click="deleteAllExercises()">Yes, I want to delete all exercises</b-button>
                <b-icon icon="empty" aria-hidden="true"/>
                <b-button @click="$bvModal.hide('deleteAllExercise')">Cancel</b-button>
              </div>
               </b-modal>
            </b-col>
          </b-row>
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
        .then(() => {
          window.location.reload()
        })
    },
    deleteAllExercises() {
      Api.delete('/exercises/')
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        })
        .then(
          window.confirm('All exercises are deleted now.')
        )
      window.location.reload()
    }
  }
}

</script>

<style scoped>

#saved-exercises {
  padding-bottom: 20px;
  width: 100%
}

@media only screen and (max-width: 768px)  {
  #exerciseBox {
    width: 100%;
    padding-bottom: 2%;
  }
}

</style>
