import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Exercises from './views/Exercises.vue'
import Exercise from './views/Exercise.vue'
import User from './views/User.vue'
import SavedExercises from './views/SavedExercises.vue'
import BodyMap from './views/BodyMap.vue'
import SignIn from './views/SignIn.vue'
import SignUp from './views/SignUp.vue'
import ManageExercises from './views/ManageExercises.vue'
import Muscle from './views/muscle.vue'

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
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/manage-exercises',
      name: 'manage-exercises',
      component: ManageExercises
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/muscles/:id',
      name: 'muscle',
      component: Muscle
    }
  ]
})
