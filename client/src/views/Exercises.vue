<template>
    <b-container>
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron header="Exercises" lead="Explore numerous exercises ready for you"></b-jumbotron>
        <div id="exerciseBox">
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
        </div>
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
    Api.get('/exercises')
      .then(response => {
        this.Exercises = response.data.exercises
      })
      .catch(error => {
        console.error(error)
        this.Exercises = []
        window.confirm('Request failed due to internal server error.')
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
          if (this.Exercises.length < 1) {
            window.confirm('There is no exercise with chosen difficulty score.')
          }
        })
        .catch(error => {
          console.error(error)
          this.exercises = []
          window.confirm('Request failed due to internal server error.')
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

@media only screen and (max-width: 768px)  {
  #exerciseBox {
    width: 100%;
    padding-bottom: 2%;
  }
}

</style>
