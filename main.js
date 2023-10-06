import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

import ProductDisplay from "./components/ProductDisplay.js";
import ReviewForm from "./components/ReviewForm.js";

createApp({
  components: {
    ProductDisplay,
    ReviewForm,
  },
  data() {
    return {
      cart: [],
      premium: true,
    };
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeFromCart() {
      this.cart.pop();
    },
  },
}).mount("#app");
