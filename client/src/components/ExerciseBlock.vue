<!--For exercise thumbnails with save buttons-->
<template>
    <div>
        <p>Exercise Name: {{exercise.Name}}</p>
        <p>Difficulty score {{exercise.DifficultyScore}}.</p>
        <b-button variant="success" v-on:click="saveExercise()">Add exercise</b-button>
    </div>
</template>

<script>
export default {
  name: 'exercise-block',
  props: ['exercise'],
  methods: {
    saveExercise() {
      this.$emit('save-exercise', this.exercise._id)
      console.log('save-exercise with id:' + this.exercise._id)
    }
  }
}
</script>

<style scoped>
p {
    color: green;
}
</style>
