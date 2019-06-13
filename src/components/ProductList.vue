<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'availableProducts'
    })
  },
  methods: {
    ...mapActions({
      fetchProducts: 'fetchProducts'
    })
  },
  created () {
    this.fetchProducts()
  }
}
</script>
