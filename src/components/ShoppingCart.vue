<template>
  <div>
      <h1>Shopping Cart</h1>
    <ul>
      <li v-for="item in shoppingCartItems" :key="item.id">
        {{ item.title }} - {{ item.price }} - {{ item.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      shoppingCartItems: 'shoppingCartItems'
    })
  }
}
</script>
