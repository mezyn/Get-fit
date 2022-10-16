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
                  <b-button pill variant=outline-danger v-on:click="addToList()"><b-icon icon="heart-fill" aria-hidden="true"></b-icon></b-button>
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
              <b-button block v-b-toggle.accordion-3 variant="light" v-on:click="showMuscle()">See Connected Muscles <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon></b-button>
            </b-card-header>
            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <div>
                    <div v-for="muscle in completeMuscles" v-bind:key="muscle._id">
                      <h4><strong>{{muscle.Name}} </strong></h4>
                      <em>({{muscle.LatinName}})</em>
                      <p>{{muscle.Description}}</p>
                      <hr>
                    </div>
                  </div>
                </b-card-text>
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
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-5 variant="light" >Leave a Review<b-icon icon="caret-down-fill" aria-hidden="true"></b-icon></b-button>
            </b-card-header>
            <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <div>
                    <form @submit.prevent="createReview" method="POST">
                        <div>
                          <p><strong>Title *</strong></p>
                          <input type="text" id="title" v-model="review.Title"> <br/>
                        </div>
                        <div>
                          <p><strong>Description *</strong></p>
                          <input type="text" id="description" v-model="review.MainText"> <br/>
                        </div>
                        <div>
                          <p><strong>Rating</strong></p>
                          <select id="rating" placeholder="Select rating (1-5) (optional)" v-model="review.Rating">
                            <option value="1">1 (Very bad)</option>
                            <option value="2">2 (Bad)</option>
                            <option value="3">3 (Moderate)</option>
                            <option value="4">4 (Good)</option>
                            <option value="5">5 (Very Good)</option>
                          </select>
                        </div>
                        <em>* Necessary fields</em>
                      </form>
                      <b-button variant="primary" v-on:click="createReview()">Send</b-button>
                  </div>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'exercise',
  props: {
    user: String
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
        Author: '',
        Exercise: ''
      },
      reviewIds: [],
      completeReviews: [],
      reviewCount: 0,

      muscleIds: [],
      completeMuscles: [],
      muscleCount: 0,
      message: ''
    }
  },
  mounted() {
    const exerciseId = this.$route.params.id
    Api.get(`/exercises/${exerciseId}`)
      .then(response => {
        this.exerciseInfo = response.data
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
      if (this.review.Title === '') {
        this.$bvModal.msgBoxOk('Title field cannot be empty')
      } else if (this.review.MainText === '') {
        this.$bvModal.msgBoxOk('Description field cannot be empty')
      } else {
        const userId = this.user
        const exerciseId = this.$route.params.id
        Api.post(`users/${userId}/exercises/${exerciseId}/reviews`, this.review)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error.response)
          })
          .then(
            window.confirm('Review successfully created!')
          )
        window.location.reload()
      }
    },
    showReview() {
      this.reviewCount += 1
      if (this.reviewCount < 2) {
        this.reviewIds = this.exerciseInfo.Reviews
        this.reviewIds.forEach(this.fetchReviewData)
      }
    },
    fetchReviewData(index) {
      Api.get('/reviews/' + index)
        .then(response => {
          this.completeReviews.push(response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    showMuscle() {
      this.muscleCount += 1
      if (this.muscleCount < 2) {
        this.muscleIds = this.exerciseInfo.Muscles
        this.muscleIds.forEach(this.fetchMuscleData)
      }
    },
    fetchMuscleData(index) {
      Api.get('/muscles/' + index)
        .then(response => {
          this.completeMuscles.push(response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    addToList() {
      const exerciseId = this.$route.params.id
      const userId = this.user
      Api.post(`users/${userId}/exercises/${exerciseId}`, this.exercise)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error.response)
        })
        .then(
          this.$bvModal.msgBoxOk('Added to your list')
          // TO DO: send a error messag
        )
    }
  }
}
</script>

<style scoped>
input {
  margin-bottom: 20px;
}
select {
  margin-bottom: 20px;
}
button {
  margin-top: 15px;
}
.container {
  margin-bottom: 30px
}
</style>
