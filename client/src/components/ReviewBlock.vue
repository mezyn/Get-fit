<!--For exercise thumbnails with save buttons-->
<template>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h4 class="card-title">{{this.exerciseInfo.Reviews.Title}}</h4>
        <p> </p>

      </div>
    </div>
</template>

<script>

export default {
  name: 'review-block',
  props: ['review']
}
</script>

<style scoped>
p {
    color: gray;
}
</style>
