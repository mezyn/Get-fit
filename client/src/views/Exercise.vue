<template>
    <div class="container">
      <b-jumbotron header="Exercise page" lead="All about the exercise"></b-jumbotron>
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-body>
              <div id='exercise'>
                  <h3>{{exerciseInfo.Name}}</h3>
                  <p><strong>Difficulty Score: </strong>{{exerciseInfo.DifficultyScore}}</p>
                  <p><strong>Tips and Tricks: </strong>{{exerciseInfo.TipsAndTricks}}</p>
              </div>
            </b-card-body>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="light">Read Tips and Tricks <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon></b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>{{exerciseInfo.TipsAndTricks}}</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-3 variant="light">See Connected Muscles <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon></b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>text</b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-4 variant="light" v-on:click="showReview()">Read Reviews <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon></b-button>
            </b-card-header>
            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <div>
                    <div v-for="review in completeReviews" v-bind:key="review._id">
                      <h4><strong>{{review.Title}}</strong></h4>
                      <p>(Rating: {{review.Rating}} of 5)</p>
                      <p>{{review.MainText}}</p>
                      <hr>
                    </div>
                  </div>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
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

export default {
  name: 'exercise',
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
      },
      reviewIds: [],
      completeReviews: [],
      count: 0
    }
  },
  mounted() {
    const exerciseId = this.$route.params.id
    // console.log('ExerciseID: ' + exerciseId)
    Api.get(`/exercises/${exerciseId}`)
      .then(response => {
        this.exerciseInfo = response.data.Exercise
        // console.log('this.exerciseInfo' + this.exerciseInfo)
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
    },
    showReview() {
      this.count += 1
      if (this.count < 2) {
        this.reviewIds = this.exerciseInfo.Reviews
        console.log('this.reviewIds: ' + this.reviewIds)
        console.log(this.reviewIds[0])
        console.log('count: ' + this.count)
        this.reviewIds.forEach(this.fetchReviewData)
      }
    },
    fetchReviewData(index) {
      console.log('we are here with index: ' + index)
      Api.get('/reviews/' + index)
        .then(response => {
          this.completeReviews.push(response.data)
          console.log('response data: ' + response.data)
          console.log('complete reviews:' + this.completeReviews)
          console.log('complete reviews:' + this.completeReviews[0])
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style scoped>

</style>
