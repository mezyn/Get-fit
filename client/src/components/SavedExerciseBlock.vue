<!--For saved exercises with delete buttons-->
<template>
    <div>
        <p>Exercise ID: {{exercise._id}}</p>
        <p>Exercise Name: {{exercise.Name}}</p>
        <p>Difficulty score: {{exercise.DifficultyScore}}.</p>
        <p>Connected Muscles: {{exercise.Muscles}}.</p>
        <p>Reviews: {{exercise.Reviews}}.</p>
        <b-button variant="danger" v-on:click="deleteExercise()">Delete from saved list</b-button>
        <b-button variant="warning" v-on:click="patchExercise()">Patch this exercise</b-button>
        <div>
          <b-button v-b-modal.patch-modal>Update this exercise</b-button>
          <b-modal id="patch-modal" title="BootstrapVue">
            <p class="my-4">Hello from modal!</p>
          </b-modal>
        </div>
        <hr>
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
    },
    patchExercise() {
      this.$emit('patch-exercise', this.exercise._id)
      console.log('patch-exercise with id:' + this.exercise._id)
    }
  }
}
</script>

<style scoped>
p {
    color: black;
}
</style>
