<template>
  <div id="app">
    <product-list></product-list>
    <hr>
    <shopping-cart></shopping-cart>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
export default {
  components: {
    ProductList,
    ShoppingCart
  }
}
</script>

<style>
  #app {
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
  }
  ul {
    list-style: none
  }
</style>
