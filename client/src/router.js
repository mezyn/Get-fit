import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Exercises from './views/Exercises.vue'
import Exercise from './views/Exercise.vue'
import User from './views/User.vue'
import SavedExercises from './views/SavedExercises.vue'
import BodyMap from './views/BodyMap.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/exercises',
      name: 'exercises',
      component: Exercises
    },
    {
      path: '/exercises/:id',
      name: 'exercise',
      component: Exercise
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/saved-exercises',
      name: 'saved-exercises',
      component: SavedExercises
    },
    {
      path: '/body-map',
      name: 'body-map',
      component: BodyMap
    }]
})
