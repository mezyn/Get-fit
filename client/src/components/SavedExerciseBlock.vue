<template>
    <div>
      <div id="details">
        <b-card no-body class="full-width">
          <b-tabs pills card vertical>
            <b-tab title="Exercise Details" active>
              <b-card-text>
                <ul>
                  <li><strong>ID:<b-icon icon="blank" aria-hidden="true"></b-icon> </strong>{{exercise._id}}</li>
                  <li><strong>Name:<b-icon icon="blank" aria-hidden="true"></b-icon> </strong>{{exercise.Name}}</li>
                  <li><strong>Difficulty Score:<b-icon icon="blank" aria-hidden="true"></b-icon> </strong>{{exercise.DifficultyScore}}</li>
                  <li><strong>Tips and Tricks:</strong></li>
                  <li>{{exercise.TipsAndTricks}}</li>
                  <li><strong>Connected Muscle IDs: </strong></li>
                  <li>{{exercise.Muscles}}</li>
                  <li><strong>Review IDs:</strong></li>
                  <li>{{exercise.Reviews}}</li>
                </ul>
              </b-card-text>
            </b-tab>
            <b-tab title="Update Exercise">
              <div class="text-center">
                <b-card-text>
                  <form @submit.prevent="updateExercise" method="PATCH">
                      <strong>New name:  </strong><br/>
                      <input type="text" id="Name" v-model="newName"/><br/>
                      <strong>Difficulty Score:  </strong><br/>
                      <select id="DifficultyScore" class="inputstyle" placeholder="Difficulty Score (1-5)" v-model="newDifficultyScore">
                      <option value="1">1 (Very easy)</option>
                      <option value="2">2 (Easy)</option>
                      <option value="3">3 (Moderate)</option>
                      <option value="4">4 (Difficult)</option>
                      <option value="5">5 (Very difficult)</option>
                    </select><br/>
                      <strong>Tips and tricks:  </strong><br/>
                      <input type="text" id="TipsAndTricks" v-model="newTipsAndTricks"/><br/>
                  </form>
                  <b-button v-on:click="updateExercise()" variant="warning">Update this exercise</b-button>
                </b-card-text>
              </div>
            </b-tab>
            <b-tab title="Delete Exercise">
              <b-card-text>
                <p>Deleted exrcises cannot be restored.</p>
                <p>Are you sure you want to delete this exercise?</p>
                <b-button variant="danger" v-on:click="deleteExercise()">Confirm deletion</b-button>
              </b-card-text>
              </b-tab>
           </b-tabs>
        </b-card>
      </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'savedExercise-block',
  props: ['exercise'],
  data() {
    return {
      newName: '',
      newDifficultyScore: 0,
      newTipsAndTricks: ''
    }
  },
  methods: {
    deleteExercise() {
      this.$emit('del-exercise', this.exercise._id)
    },
    updateExercise() {
      const id = this.exercise._id
      if (this.newName === '' && this.newDifficultyScore === 0 && this.newTipsAndTricks === '') {
        this.$bvModal.msgBoxOk('Fill out at least one field to be updated')
      } else {
        Api.patch(`/exercises/${id}`, {
          Name: this.newName,
          DifficultyScore: this.newDifficultyScore,
          TipsAndTricks: this.newTipsAndTricks
        })
          .catch(error => {
            if (error.response.status === 409) {
              window.confirm('There is already an exercise with this name. Choose another name.')
            } else {
              window.confirm('Could not update exercise due to internal server error.')
              console.error(error)
            }
          })
          .then(() => {
            window.location.reload()
          })
      }
    }
  }
}
</script>

<style scoped>
p {
    color: black;
    margin-bottom: 10px;
    margin-top: 10px;
}
li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
}
button {
  margin-top: 20px;
  margin-bottom: 0px;
}

input {
  margin-top: 10px;
  margin-bottom: 10px;
}

</style>
