export default {
  allItems (state) {
    return state.products
  },
  availableProducts (state) {
    return state.products.filter((product) => {
      return product.inventory > 0
    })
  },
  shoppingCartItems (state) {
    return state.cart.map(cartItem => {
      const product = state.products.find((product) => {
        return product.id === cartItem.id
      })
      return {
        title: product.title,
        price: product.price,
        quantity: cartItem.quantity
      }
    })
  },
  cartTotal (state) {
    let sum = 0
    state.cart.forEach(cartItem => {
      sum += cartItem.price * cartItem.quantity
    })
    return sum
  },
  checkoutStatus (state) {
    return state.checkoutStatus
  },
  productIsInStock () {
    return (product) => {
      return product.inventory > 0
    }
  }
}
