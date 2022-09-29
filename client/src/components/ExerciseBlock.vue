<!--For exercise thumbnails with save buttons-->
<template>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h4 class="card-title">{{this.exercise.Name}}</h4>
        <p>Difficulty: {{exercise.DifficultyScore}}</p>
        <b-button href="#" variant="info" v-on:click="readExercise()">Read more</b-button>

      </div>
    </div>
</template>

<script>

export default {
  name: 'exercise-block',
  props: ['exercise'],
  methods: {
    readExercise() {
      const exerciseId = this.exercise._id
      this.$router.push({ path: `/user/${exerciseId}` })
    }
  }
}
</script>

<style scoped>
p {
    color: gray;
}
</style>
