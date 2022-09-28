import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Exercises from './views/Exercises.vue'
import User from './views/User.vue'
import SavedExercises from './views/SavedExercises.vue'

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
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/saved-exercises',
      name: 'saved-exercises',
      component: SavedExercises
    }
  ]
})
