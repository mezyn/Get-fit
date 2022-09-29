<template>
    <div>
        <h1>this is a page for exercise {{this.$route.params.id}}</h1>
        <h5>exercise description</h5>
        {{data}}
    </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'exercise',
  mounted() {
    const exerciseId = this.$route.params.id
    console.log('ExerciseID: ' + exerciseId)
    // Load the real exercises from the server
    Api.get(`/exercise/${exerciseId}`) // not sure
      .then(response => {
        this.exercise = response.data.exercise
      })
      .catch(error => {
        console.error(error)
        this.exercise = []
        // TO DO: send a error message
      })
      .then(() => {
        // This code is always executed at the end. After success or failure. (optional)
      })
  },
  data() {
    return {
      exercise: []
    }
  }
}
</script>
