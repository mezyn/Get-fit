<template>
  <div class="container" id="createBox">
    <div>
      <b-button v-b-modal.create variant="success">+ Create new exercise</b-button>
      <b-modal id="create" title="Create new exercise" hide-footer>
        <div>
          <form @submit.prevent="postExercise" method="POST">
            <div>
              Name (obligatory):
              <input type="text" id="Name" v-model="exercise.Name"> <br/>
            </div>
            <div>
              Difficulty Score (optional) :
              <select id="DifficultyScore" placeholder="Difficulty Score (1-5) (optional)" v-model="exercise.DifficultyScore">
                <option value="1">1 (Very easy)</option>
                <option value="2">2 (Easy)</option>
                <option value="3">3 (Moderate)</option>
                <option value="4">4 (Difficult)</option>
                <option value="5">5 (Very difficult)</option>
              </select>
            </div>
            <div>
              Tips and tricks (optional):
              <input type="text" id="TipsAndTricks" v-model="exercise.TipsAndTricks"> <br/>
            </div>
          </form>
          <b-button variant="success" v-on:click="createExercise()">Create exercise</b-button>
          <b-button @click="$bvModal.hide('create')">Cancel</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'new-exercise',
  data() {
    return {
      exercise: {
        Name: '',
        DifficultyScore: null,
        Reviews: [],
        Muscles: [],
        TipsAndTricks: ''

      }
    }
  },
  methods: {
    createExercise() {
      Api.post('/exercises', this.exercise)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        }
        // TO DO: send a error message
        )
      window.location.reload()
    }
  }

}
</script>

<style scoped>
#createBox{
  border-color: black;
  border-width: thin;
}

</style>
