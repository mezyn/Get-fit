<!--For now, it's showing all exercise info.
We need to implement how to specify user and update the details in the code, but they'll look something like this.-->
<template>
    <b-container>
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="Exercises" lead="Explore numerous exercises ready for you"></b-jumbotron>
        <b-row id="filter-row">
            <b-col id="filter-col">
              <div id="filter-div">
                <filter-block v-on:filter-exercise="filterExercise"/>
              </div>
            </b-col>
        </b-row>
        <br/>
        <b-row>
          <b-col>
            <div class="card-deck">
                    <div id="exercises" v-for="exercise in Exercises" v-bind:key="exercise._id">
                    <exercise-block v-bind:exercise="exercise"/>
              </div>
            </div>
          </b-col>
        </b-row>
    </b-container>
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

.filter-div {
  align-items: baseline;
}
#exercises {
  padding-bottom: 20px;
}

</style>
