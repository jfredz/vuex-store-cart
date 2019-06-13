import Vuex from 'vuex'
import Vue from 'vue'
import shop from '../api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: []
  },
  getters: {
    availableProducts (state) {
      return state.products.filter((product) => {
        return product.inventory > 0
      })
    }
  },
  actions: {
    fetchProducts ({ commit }) {
      shop.getProducts(products => {
        commit('setProducts', products)
      })
    }
  },
  mutations: {
    setProducts (state, products) {
      state.products = products
    }
  }
})
