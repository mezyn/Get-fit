<!--For now, it's showing all exercise info.
We need to implement how to specify user and update the details in the code, but they'll look something like this.-->
<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="Exercises" lead="You're seeing all exerciese"></b-jumbotron>
          <div>
            <filter-block v-on:filter-exercise="filterExercise"/><br/>
            <div class="row">
              <div id="exercises" v-for="exercise in Exercises" v-bind:key="exercise._id">
              <exercise-block v-bind:exercise="exercise"/>
              </div>
            </div>
        </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ExerciseBlock from '@/components/ExerciseBlock.vue'
import FilterBlock from '@/components/FilterBlock.vue'

export default {
  name: 'exercises',
  components: {
    ExerciseBlock,
    FilterBlock
  },
  mounted() {
    console.log('PAGE is loaded')
    // Load the real exercises from the server
    Api.get('/exercises')
      .then(response => {
        this.Exercises = response.data.exercises
      })
      .catch(error => {
        console.error(error)
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
      ],
      selected: 0
    }
  },
  methods: {
    filterExercise(selected) {
      console.log('arrived here in filter exercise')
      Api.get(`/exercises/?difficultyscore=${selected}`)
        .then(response => {
          this.Exercises = response.data.Exercises
          console.log(this.Exercises.length)
          if (this.Exercises.length < 1) {
            this.message = 'There is no exercise with chosen difficulty score.' // How to make the page loaded to see the updated message?
          }
        })
        .catch(error => {
          console.error(error)
          this.exercises = []
          // TO DO: send a error message
        })
        .then(() => {
          // This code is always executed at the end. After success or failure. (optional)
        })
    }
  }
}
</script>

<style scoped>
#exercises {
  padding-right: 10px;
  padding-bottom: 10px;
}

</style>
