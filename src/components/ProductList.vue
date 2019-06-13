<template>
  <div>
    <h1>Product List</h1>
    <div v-if="loading">
      <img src="https://i.imgur.com/N5b6d99.gif" class="loader">
    </div>
    <div v-else>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price | currency }} - {{ product.inventory }}
          <button @click="addProductToCart(product)">Add To Cart</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      products: 'availableProducts'
    })
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts',
      addToCart: 'addProductToCart'
    }),
    addProductToCart (product) {
      this.addToCart(product)
    }
  },
  created () {
    this.loading = true
    this.fetchProducts()
      .then(() => {
        this.loading = false
      })
  }
}
</script>

<style scoped>
  .loader {
    height: 100px;

  }
</style>
