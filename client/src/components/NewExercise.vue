<template>
  <div class="container" id="createBox">
    <div>
      <b-button v-b-modal.create variant="success" class="float-right">+ Create new exercise</b-button>
      <b-modal id="create" centered title="Create new exercise" hide-footer no-close-on-esc no-close-on-backdrop hide-header-close>
        <div>
          <form @submit.prevent="postExercise" method="POST">
            <div>
              <ul>
                <li>Name (obligatory):
                    <input type="text" id="Name" name="Name" v-model="exercise.Name"> </li>
                <li>Difficulty Score (optional) :
                <select id="DifficultyScore" name="DifficultyScore" placeholder="Difficulty Score (1-5) (optional)" v-model="exercise.DifficultyScore">
                  <option value="1">1 (Very easy)</option>
                  <option value="2">2 (Easy)</option>
                  <option value="3">3 (Moderate)</option>
                  <option value="4">4 (Difficult)</option>
                  <option value="5">5 (Very difficult)</option>
                </select></li>
                <li>Tips and tricks (optional):
                <input type="text" id="TipsAndTricks" name="TipsAndTricks" v-model="exercise.TipsAndTricks"></li>
              </ul>
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
      if (this.exercise.Name === '') {
        this.$bvModal.msgBoxOk('Name cannot be empty')
      } else {
        Api.post('/exercises', this.exercise)
          .then(res => {
            console.log(res)
            window.confirm('Exercise successfully created!')
            window.location.reload()
          })
          .catch(error => {
            if (error.response.status === 409) {
              this.$bvModal.msgBoxOk('An exercise with the same name already exists. Try with another name.')
            } else {
              window.confirm('Creation failed due to internal server error.')
            }
            console.log(error.response)
          }
          )
      }
    }
  }

}
</script>

<style scoped>
#createBox{
  border-color: black;
  border-width: thin;
}

li {
  padding-top: 5px;
  padding-bottom: 5px;
}

button {
  margin-left: 10px;
  margin-right: 10px;
}
</style>
