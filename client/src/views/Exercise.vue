<template>
    <div class="container">
      <b-jumbotron header="Exercise page" lead="All about the exercise"></b-jumbotron>
        <h4>Description for Exercise ID: </h4>
        <h5>{{this.$route.params.id}}</h5>
        <div id='exercise'>
            Exercise Name: {{exerciseInfo.Name}}<br/>
            Difficulty Score: {{exerciseInfo.DifficultyScore}}<br/>
            Tips and Tricks: {{exerciseInfo.TipsAndTricks}}<br/>
            Connected muscles: {{exerciseInfo.Muscles}}<br/>
        </div>
        <div>
            <review-block v-bind:exercise="exerciseInfo"/>
        </div>
            <div v-for="review in exerciseInfo.Reviews" v-bind:key="review._id">
            </div>
            <br/>
            <h2>Create new review?</h2>
        <form @submit.prevent="createReview" method="POST">
            <div>
              Title (obligatory):
              <input type="text" id="title" v-model="review.Title"> <br/>
            </div>
            <div>
              Rating (optional) :
              <select id="rating" placeholder="Select rating (1-5) (optional)" v-model="review.Rating">
                <option value="1">1 (Very bad)</option>
                <option value="2">2 (Bad)</option>
                <option value="3">3 (Moderate)</option>
                <option value="4">4 (Good)</option>
                <option value="5">5 (Very Good)</option>
              </select>
            </div>
            <div>
              Description (obligatory):
              <input type="text" id="description" v-model="review.MainText"> <br/>
            </div>
          </form>
          <b-button v-on:click="createReview()">Submit review</b-button>
        </div>
</template>

<script>
import { Api } from '@/Api'
import ReviewBlock from '@/components/ReviewBlock.vue'

export default {
  name: 'exercise',
  components: {
    ReviewBlock
  },
  data() {
    return {
      exerciseInfo: {
        Name: '',
        _id: '',
        DifficultyScore: 0,
        Reviews: [],
        Muscles: [],
        TipsAndTricks: ''
      },
      review: {
        Title: '',
        Rating: null,
        MainText: '',
        // Author: 'We need to fix this',
        Exercise: ''
      }
    }
  },
  mounted() {
    const exerciseId = this.$route.params.id
    // console.log('ExerciseID: ' + exerciseId)
    Api.get(`/exercises/${exerciseId}`)
      .then(response => {
        this.exerciseInfo = response.data.Exercise
        console.log(this.exerciseInfo)
      })
      .catch(error => {
        console.error(error)
        this.exerciseInfo = null
        // TO DO: send a error message
      })
      .then(() => {

      })
  },
  methods: {
    createReview() {
      const exerciseId = this.$route.params.id
      Api.post(`/exercises/${exerciseId}`, this.review)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        }
        // TO DO: send a error message
        )
      window.location.reload()
    }
  }
}
</script>
