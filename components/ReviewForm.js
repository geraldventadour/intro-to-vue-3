export default {
  template:
    /*html*/
    `<form class="review-form" @submit.prevent=onSubmit>
      <h3>Leave a review</h3>
      <label for="name" >Name:</label>
      <input type="text" id="name" v-model="name">

      <label for="review" >Review:</label>
      <textarea name="" id="review" v-model="review"></textarea>

      <label for="rating" >Rating:</label>
      <select name="rating" id="rating" v-model.number="rating">
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>

      <label for="recommend">Would you recommend this product?</label>
      <select id="recommend" v-model="recommend">
        <option>Yes</option>
        <option>No</option>
      </select>

      <input class="button" type="submit" value="Submit">
    </form>`,
  data() {
    return {
      name: '',
      review: '',
      rating: null,
      recommend: null,
    };
  },
  methods: {
    onSubmit() {
      if (
        this.name === '' ||
        this.review === '' ||
        this.rating === null ||
        this.recommend === null
      ) {
        alert('Review is incomplete. Please fill out every field.');
        return;
      }

      const productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        recommend: this.recommend,
      };
      this.$emit('review-submitted', productReview);
      this.name = '';
      this.review = '';
      this.rating = null;
      this.recommend = null;
    },
  },
};
