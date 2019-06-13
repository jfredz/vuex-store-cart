import Vuex from 'vuex'
import Vue from 'vue'
import shop from '../api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null
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
  },
  mutations: {
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
})
