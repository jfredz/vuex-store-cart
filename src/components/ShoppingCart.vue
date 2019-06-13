<template>
  <div>
      <h1>Shopping Cart</h1>
    <ul>
      <li v-for="item in shoppingCartItems" :key="item.id">
        {{ item.title }} - {{ item.price | currency}} - {{ item.quantity }}
      </li>
    </ul>
    <div v-if="shoppingCartItems.length > 0">
      <h2>Total: {{ cartTotal | currency }}</h2>
      <button @click="checkoutCart">Checkout</button>
    </div>
    {{ checkoutStatus }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      shoppingCartItems: 'shoppingCartItems',
      cartTotal: 'cartTotal',
      checkoutStatus: 'checkoutStatus'
    })
  },
  methods: {
    ...mapActions({
      checkout: 'checkout'
    }),
    checkoutCart () {
      this.checkout()
    }
  }
}
</script>
