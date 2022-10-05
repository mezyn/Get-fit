<template>
    <div>
        <h4>Description for Exercise ID: </h4>
        <h5>{{this.$route.params.id}}</h5>
        <div id='exercise'>
            Exercise Name: {{exerciseInfo.Name}}<br/>
            Difficulty Score: {{exerciseInfo.DifficultyScore}}<br/>
            Tips and Tricks: {{exerciseInfo.TipsAndTricks}}<br/>
            Connected muscles: {{exerciseInfo.Muscles}}<br/>
            Reviews: {{exerciseInfo.Reviews}}<br/>
            </div>
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'exercise',
  data() {
    return {
      exerciseInfo: {
        Name: '',
        _id: '',
        DifficultyScore: 0,
        Reviews: [],
        Muscles: [],
        TipsAndTricks: ''
      }
    }
  },
  mounted() {
    const exerciseId = this.$route.params.id
    // console.log('ExerciseID: ' + exerciseId)
    Api.get(`/exercises/${exerciseId}`)
      .then(response => {
        this.exerciseInfo = response.data.Exercise
        console.log(this.exerciseInfo)
      })
      .catch(error => {
        console.error(error)
        this.exerciseInfo = null
        // TO DO: send a error message
      })
      .then(() => {
        // This code is always executed at the end. After success or failure. (optional)
      })
  }
}
</script>
