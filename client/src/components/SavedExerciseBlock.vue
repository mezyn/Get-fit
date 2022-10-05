<!--For saved exercises with delete buttons-->
<template>
    <div>
      <div class='card' style="width: 35 rem">
        <div class="card-body">
          <p>Exercise ID: {{exercise._id}}</p>
          <p>Exercise Name: {{exercise.Name}}</p>
          <p>Difficulty score: {{exercise.DifficultyScore}}</p>
          <p>Connected Muscles: {{exercise.Muscles}}</p>
          <p>Tips and Tricks: {{exercise.TipsAndTricks}}</p>
          <p>Reviews: {{exercise.Reviews}}.</p>
          <b-button v-b-modal.delete variant="danger" >Delete exercise</b-button>
          <b-modal id="delete" title="Confirm deletion" hide-footer>
            <div>
              <p>Are you sure you want to delete <B>{{exercise.Name}}</B>?</p>
              <b-button variant="danger" v-on:click="deleteExercise()">Confirm deletion</b-button>
              <b-button @click="$bvModal.hide('delete')">Cancel</b-button>
            </div>
          </b-modal>
          <b-button v-b-modal.update variant="warning">Update exercise</b-button>
          <b-modal id="update" title="Update exercise" hide-footer>
            <div>
              <p>Update <B>{{exercise.Name}}</B></p>

               <form @submit.prevent="updateExercise" method="PATCH">
                  <div>
                    Name:
                    <input type="text" id="Name" v-model="newName"> <br/>
                  </div>
                  <div>
                    Difficulty Score:
                    <select id="DifficultyScore" placeholder="Difficulty Score (1-5)" v-model="newDifficultyScore">
                      <option value="1">1 (Very easy)</option>
                      <option value="2">2 (Easy)</option>
                      <option value="3">3 (Moderate)</option>
                      <option value="4">4 (Difficult)</option>
                      <option value="5">5 (Very difficult)</option>
                    </select>
                  </div>
                  <div>
                    Tips and tricks:
                    <input type="text" id="TipsAndTricks" v-model="newTipsAndTricks"> <br/>
                  </div>
                </form>
              <b-button variant="success" v-on:click="updateExercise()">Update exercise</b-button>
              <b-button @click="$bvModal.hide('update')">Cancel</b-button>
            </div>
          </b-modal>
        </div>
      </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'savedExercise-block',
  props: ['exercise'],
  methods: {
    deleteExercise() {
      this.$emit('del-exercise', this.exercise._id)
      console.log('del-exercise with id:' + this.exercise._id)
    },
    updateExercise() { // need to fix
      const id = this.exercise._id
      Api.patch(`/exercises/${id}`, {
        Name: this.newName,
        DifficultyScore: this.newDifficultyScore,
        TipsAndTricks: this.newTipsAndTricks
      }
      ).catch(error => {
        console.error(error)
      }).then(() => {
        window.location.reload()
      })
    }
  }
}
</script>

<style scoped>
p {
    color: black;
}
</style>
