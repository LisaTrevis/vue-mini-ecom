app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: /*html*/ `
    <div class="product-display">
        <div class="product-container">
          <div class="product-image">
            <img v-bind:src="image" />
          </div>
          <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div class="color-circle-container">
            <div
              v-for="(variant, index) in variants"
              :key="variant.id"
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{ backgroundColor: variant.color }"
            ></div>
            </div>

            <button
              class="button"
              :class="{ disabledButton: !inStock }"
              :disabled="!inStock"
              v-on:click="addToCart"
            >
              Add to Cart
            </button>
            <button
              v-if="inStock"
              class="button"
              :class="{ disabledButton: !inStock }"
              :disabled="!inStock"
              v-on:click="removeById"
            >
              Remove Item
            </button>
          </div>
        </div>
        <review-list :reviews="reviews" v-if="reviews.length"></review-list>
        <review-form @review-submitted="addReview"></review-form>
      </div>`,
  data() {
    return {
      product: 'Elf Coats',
      brand: 'Forest Fairy',
      selectedVariant: 0,
      details: ['Hand Made', 'Unique Design', 'Upcycled Materials'],
      variants: [
        {
          id: 1,
          color: 'hotpink',
          image: './assets/images/candyfront.jpg',
          quantity: 50,
        },
        {
          id: 2,
          color: 'teal',
          image: './assets/images/oceanfront.jpg',
          quantity: 0,
        },
        {
          id: 3,
          color: 'darkblue',
          image: './assets/images/southwestfront.jpg',
          quantity: 1,
        },
      ],
      reviews: [],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeById() {
      this.$emit('remove-by-id', this.variants[this.selectedVariant].id)
    },
    updateVariant(index) {
      this.selectedVariant = index
    },
    addReview(review) {
      this.reviews.push(review)
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity
    },
    shipping() {
      if (this.premium) {
        return 'Free'
      }
      return '$12.99'
    },
  },
})
