<template>
    <div>
        <div>
            Filter by Difficulty Score:
            <select v-model="selected" id="filterBlock" placeholder="Select 1-5" :value="selected" @change="onSelectedDifficultyScore(selected)">
              <option :value="1">1 (Very easy)</option>
              <option :value="2">2 (Easy)</option>
              <option :value="3">3 (Moderate)</option>
              <option :value="4">4 (Difficult)</option>
              <option :value="5">5 (Very difficult)</option>
            </select>
        </div>
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
      this.$emit('filter-exercise', selected)
      console.log('filter-exercise with score:' + selected)
    }
  }
}
</script>

<style scoped>
p {
    color: black;
}
</style>
