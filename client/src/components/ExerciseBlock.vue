<!--For exercise thumbnails with save buttons-->
<template>
  <b-container>
    <div class="card">
      <div class="card-body">
          <h4 class="card-title">{{this.exercise.Name}}</h4>
            <b-button href="#" variant="info" v-on:click="readExercise()">Read more</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>

export default {
  name: 'exercise-block',
  props: ['exercise'],
  methods: {
    readExercise() {
      const exerciseId = this.exercise._id
      this.$router.push({ path: `/exercises/${exerciseId}` })
    }
  }
}
</script>

<style scoped>
p {
    color: gray;
}

@media only screen and (min-width: 541px)  {
  .card {
    width: 25rem;
}
}
</style>
