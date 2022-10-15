<!--For now, it's showing all exercise info.
We need to implement how to specify user and update the details in the code, but they'll look something like this.-->
<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="My Exercises" lead="All exercises I'm interested"></b-jumbotron>
        <div>
            <div v-for="exercise in savedExerciseIds" v-bind:key="exercise._id">
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
    Api.get(`/users/${userId}/exercises`) // For now we have this path. Later we should change it like '/users/:user_id/exercises'
      .then(response => {
        this.savedExerciseIds = response.data
        console.log('mounted-savedExercises: ' + this.savedExerciseIds)
        this.savedExerciseIds.forEach(this.fetchExerciseData)
      })
      .catch(error => {
        console.error(error)
        this.savedExerciseIds = []
        // TO DO: send a error message
      })
      .then(() => {
        console.log('this.exercises: ' + JSON.stringify(this.exercises))
        // This code is always executed at the end. After success or failure. (optional)
      })
  },
  data() {
    return {
      savedExerciseIds: [
      ],
      exercises: [
      ]
    }
  },
  methods: {
    fetchExerciseData(index) {
      Api.get('/exercises/' + index)
        .then(response => {
          this.exercises.push(response.data)
          console.log('response.data: ' + JSON.stringify(response.data))
        })
        .catch(error => {
          console.log(error.response)
        })
    }

  }
}
</script>
