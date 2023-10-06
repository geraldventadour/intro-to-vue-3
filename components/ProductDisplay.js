import ReviewForm from './ReviewForm.js';
import ReviewList from './ReviewList.js';

export default {
  components: { ReviewForm, ReviewList },
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  template:
    /*html*/
    `<div class="product-display">
  <div class="product-container">
    <div class="product-image">
      <!-- image goes here -->
      <img :src="imageURL" :class="{'out-of-stock-img':!inStock}" alt="">
    </div>
    <div class="product-info">
      <h1>{{ title }}</h1>
      <p v-if="inStock">In Stock</p>
      <p v-else>Out of Stock</p>
      <p>Shipping: {{shipping}}</p>
      <ul>
        <li v-for="detail of details" >{{detail}}</li>
      </ul>
      <div v-for="(variant,index) of variants" :key="variant.id" @mouseover="updateVariant(index)" class="color-circle" :style="{backgroundColor: variant.color}"></div>
      <button class="button" :class="{disabledButton:!inStock}" @click="addToCart" :disabled="!inStock" >Add to Cart</button>
      <button class="button" v-show="isCartFull" @click="removeFromCart">Remove item</button>
    </div>
  </div>
  <review-list v-if="hasReviews" :reviews="reviews"></review-list>
  <review-form @review-submitted="addReview"></review-form>
</div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        {
          id: 2234,
          color: 'green',
          imageURL: './assets/images/socks_green.jpg',
          quantity: 50,
          onSale: true,
        },
        {
          id: 2235,
          color: 'blue',
          imageURL: './assets/images/socks_blue.jpg',
          quantity: 0,
          onSale: false,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      if (this.cart.length > 0) {
        this.$emit('remove-from-cart');
      }
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return `${this.brand} ${this.product} ${
        this.variants[this.selectedVariant].onSale ? ' on sale' : ''
      }`;
    },
    imageURL() {
      return this.variants[this.selectedVariant].imageURL;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity > 0;
    },
    isCartFull() {
      return this.cart.length > 0;
    },
    shipping() {
      return this.premium ? 'Free' : '2.99';
    },
    hasReviews() {
      return this.reviews.length > 0;
    },
  },
};
