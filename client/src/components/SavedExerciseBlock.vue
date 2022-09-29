<!--For saved exercises with delete buttons-->
<template>
    <div>
        <p>Exercise Name: {{exercise.Name}}</p>
        <p>Difficulty score {{exercise.DifficultyScore}}.</p>
        <b-button variant="danger" v-on:click="deleteExercise()">Delete from saved list</b-button>
    </div>
</template>

<script>
export default {
  name: 'savedExercise-block',
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
    color: black;
}
</style>
