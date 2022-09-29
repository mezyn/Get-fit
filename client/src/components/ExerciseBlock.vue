<!--For exercise thumbnails with save buttons-->
<template>
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">{{this.exercise.Name}}</h4>
        <p>Difficulty: {{exercise.DifficultyScore}}</p>
        <b-button variant="success" v-on:click="readExercise()">Read more</b-button>

      </div>
    </div>
</template>

<script>

export default {
  name: 'exercise-block',
  props: ['exercise'],
  methods: {
    readExercise() {
      console.log(this.$router.push('exercise'))
      this.$router.push('/:id')
    }
  }
}
</script>

<style scoped>
p {
    color: gray;
}
</style>
