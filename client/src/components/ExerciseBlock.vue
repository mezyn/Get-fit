<!--For exercose thumbnails-->
<template>
    <div>
        <p>The {{exercise.Name}} exercise with a difficulty score {{exercise.DifficultyScore}}.</p>
        <b-button variant="danger" v-on:click="deleteExercise()">X</b-button>
    </div>
</template>

<script>
export default {
  name: 'exercise-block',
  props: ['exercise'],
  methods: {
    deleteExercise() {
      this.$emit('del-exercise', this.exercise._id)
      console.log('del-exercise with id:' + this.exercise._id)
    }
  }
}
</script>

<style scoped>
p {
    color: green;
}
</style>
