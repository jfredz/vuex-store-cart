import shop from '../api/shop'

export default {
  fetchProducts ({ commit }) {
    return new Promise((resolve, reject) => {
      shop.getProducts(products => {
        commit('setProducts', products)
        resolve()
      })
    })
  },
  addProductToCart (context, product) {
    if (product.inventory > 0) {
      let cartItem = context.state.cart.find(item => item.id === product.id)
      if (!cartItem) {
        context.commit('pushProductToCart', product)
      } else {
        context.commit('incrementProductCount', cartItem)
      }
      context.commit('decrementProductInventory', product)
    }
  },
  checkout ({ state, commit }) {
    shop.buyProducts(
      state.cart,
      () => {
        commit('emptyCart')
        commit('setCheckoutStatus', 'success')
      },
      () => {
        commit('setCheckoutStatus', 'fail')
      }
    )
  }
}
