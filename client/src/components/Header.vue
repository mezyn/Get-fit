<template>
  <div class="row">
    <div class="col-6 col-md-4">
      <router-link to="/user"><img src="@/assets/profile.png"  alt="profile" width="15%" /></router-link>
    </div>
    <div class="col-6 col-md-4"> </div>
    <div class="col-6 col-md-4">
      <router-link to="/"><img src="@/assets/Logo.png" alt="logo" width="60%" /></router-link>
    </div>
  </div>
</template>

<style scoped>
  img {
    float: left;
    padding: 10px;
  }
</style>
