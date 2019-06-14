export default {
  setProducts (state, products) {
    state.products = products
  },
  pushProductToCart (state, product) {
    state.cart.push({
      id: product.id,
      quantity: 1,
      price: product.price
    })
  },
  incrementProductCount (state, cartItem) {
    cartItem.quantity++
  },
  decrementProductInventory (state, product) {
    product.inventory--
  },
  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  },
  emptyCart (state) {
    state.cart = []
  }
}
