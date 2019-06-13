import Vuex from 'vuex'
import Vue from 'vue'
import shop from '../api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  getters: {
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
    }
  },
  actions: {
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
          context.commit('pushProductToCart', product.id)
        } else {
          context.commit('incrementProductCount', cartItem)
        }
        context.commit('decrementProductInventory', product)
      }
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    },
    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },
    incrementProductCount (state, cartItem) {
      cartItem.quantity++
    },
    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
})
