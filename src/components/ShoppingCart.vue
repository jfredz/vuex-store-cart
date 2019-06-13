<template>
  <div>
      <h1>Shopping Cart</h1>
    <ul>
      <li v-for="item in shoppingCartItems" :key="item.id">
        {{ item.title }} - {{ item.price | currency}} - {{ item.quantity }}
      </li>
    </ul>
    <h2>Total: {{ cartTotal | currency }}</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      shoppingCartItems: 'shoppingCartItems',
      cartTotal: 'cartTotal'
    })
  }
}
</script>
