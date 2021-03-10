const app = Vue.createApp({
  data() {
    return {
      cart: 0,
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
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateVariant(index) {
      this.selectedVariant = index
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
  },
})
