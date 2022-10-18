<template>
    <div class="container">
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <b-jumbotron :header="this.muscleInfo.Name" :lead="this.muscleInfo.LatinName">{{muscleInfo.Description}}</b-jumbotron>
            <div id="text-block">
             <h3>Here you can see all exercises you can do to train this muscle:</h3>
            </div>
            <div id = "exerciseBox" v-for="exercise in muscleInfo.Exercises" v-bind:key="exercise._id">
                <exercise-block v-bind:exercise="exercise"/>
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

<style scoped>
@media only screen and (max-width: 768px)  {
  #exerciseBox {
    width: 100%;
    padding-bottom: 2%;
  }
}

#exerciseBox {
  padding-top: 30px;
  padding-bottom: 30px;
}

#text-block {
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>>
