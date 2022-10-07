<template>
    <div>
      <div id="accordion">
        <div class="card">
          <div class="card-header" id="headingOne">
            <h5 class="mb-0">
              <button class="btn btn-link" v-on:click="showReview()" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                See reviews
              </button>
            </h5>
          </div>
          <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
              <ul clsss= "list-group">
                <li class="list-group-item" v-for="review in reviews" :key="review._id">
                  <h3>{{ review.Title }}</h3>
                  <p>(Rating: {{ review.Rating }})</p>
                  <p>{{ review.MainText }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'review-block',
  props: {
    exercise: Object
  },
  data() {
    return {
      reviewIds: [],
      reviews: [],
      titles: [],
      mainText: [],
      ratings: [],
      showed: false
    }
  },
  methods: {
    showReview() {
      this.reviewIds = this.exercise.Reviews
      if (this.showed === false) {
        this.reviewIds.forEach(this.fetchReviewData)
        this.showed = true
      }
    },
    fetchReviewData(index) {
      Api.get('/reviews/' + index)
        .then(response => {
          this.reviews.push(response.data)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style scoped>
p {
    color: gray;
}
</style>
