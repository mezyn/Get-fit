<template>
    <div>
      <b-button v-b-toggle.collapse-1 variant="outline-success" class="float-right">
        <b-icon icon="funnel-fill" aria-hidden="true"></b-icon>
      </b-button>
      <b-collapse id="collapse-1" class="mt-2">
        <b-card>
          <div>
            <p><strong>Filter by Difficulty Level</strong></p>
            <select v-model="selected" id="filterBlock" :value="selected" @change="onSelectedDifficultyScore(selected)">
              <option :value="1">1 (Very easy)</option>
              <option :value="2">2 (Easy)</option>
              <option :value="3">3 (Moderate)</option>
              <option :value="4">4 (Difficult)</option>
              <option :value="5">5 (Very difficult)</option>
            </select>
          </div>
        </b-card>
      </b-collapse>
    </div>
</template>

<script>
export default {
  name: 'filter-block',
  data() {
    return {
      selected: 0
    }
  },
  methods: {
    onSelectedDifficultyScore(selected) {
      try {
        this.$emit('filter-exercise', selected)
        console.log('filter-exercise with score:' + selected)
      } catch (error) {
        console.error(error)
        window.confirm('Could not filter exercises due to internal server error.')
      }
    }
  }
}
</script>

<style scoped>
p {
    color: black;
}
</style>
