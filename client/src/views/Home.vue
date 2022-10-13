<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <img src="@/assets/chicken_rice.jpg"  alt="profile" width="100%" />
      </div>
      <div class="col">
        <h3 class="text">Nutrition</h3>
        <p class="text"> Nutrition is the most important part of your journey to becoming healthy,
          no amount of effort in workouts will compensate for an insufficient or unhealthy diet.
          But dieting is simpler than most people think. To break down this complex topic we have to
          understand that humans need enough calories, macro and micronutrients to properly function.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3 class="text">Macronutrients</h3>
        <p class="text">Carbohydrates: Source of energy and can be found in large quantities in common foods like rice, bread, potatoes and beans, among others.
Proteins:. used to build muscles and organs, and to make hormones and antibodies. They can be found, among other foods, in meats, fishes and also in vegetable alternatives like tofu, beans, broccoli and spinach.
Fats: a wildly misunderstood macronutrient, they provide energy, they help regulate body temperature and support cell functions. Although fats are a necessary macronutrient, not all fats are good, especially those in processed foods. Some healthy alternatives are olive oil, nuts, avocados and salmon.
        </p>
      </div>
      <div class="col">
        <img src="@/assets/macronutrients.png"  alt="profile" width="100%" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <img src="@/assets/micronutrients.jpg"  alt="profile" width="100%" />
      </div>
      <div class="col">
        <h3 class="text">Micronutrients</h3>
        <p class="text"> Micronutrients can be divided into four groups: water-soluble vitamins, fat-soluble vitamins, macrominerals and trace minerals. In order to obtain enough micronutrients it is important to include fruits, vegetables and seeds into your diet.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}

#background {
  background-color: white;
}

.text {
  text-align: justify;
  hyphens: auto;
}

.row {
  padding: 2%;
}
</style>
