<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron :header="this.muscleInfo.Name" :lead="this.muscleInfo.LatinName">{{muscleInfo.Description}}</b-jumbotron>
        <h3>Here you can see all exercises you can do to train this muscle:</h3>
        <div>
            <div v-for="exercise in muscleInfo.Exercises" v-bind:key="exercise._id">
                <exercise-block v-bind:exercise="exercise"/>
            </div>
        </div>
    </div>
</template>

<script>
import { Api } from '@/Api'
import ExerciseBlock from '@/components/ExerciseBlock.vue'

export default {
  name: 'muscle',
  components: {
    ExerciseBlock
  },
  data() {
    return {
      muscleInfo: {
        Name: '',
        _id: '',
        LatinName: '',
        Description: '',
        Exercises: []
      }
    }
  },
  mounted() {
    const muscleId = this.$route.params.id
    console.log('MuscleID: ' + muscleId)
    Api.get(`/muscles/${muscleId}`)
      .then(res => {
        console.log(res.data)
        this.muscleInfo = res.data
        console.log(this.muscleInfo)
      })
      .catch(err => {
        console.log('There was an error')
        console.error(err)
        this.$bvModal.msgBoxOk('This muscle could not be found.')
      })
      .then(() => {

      })
  }
}
</script>
