import Vue from 'vue';
import Vuex from 'vuex';
import instance from '../axiosConfig'

Vue.use(Vuex);

export default {
  state: () => ({
    basket: [],
    basketTotalPrice: 0,
    userAccessKey: ''
  }),
  getters: {
    basketProducts(state, getters) {
      return state.basket
    },
    productsQuantity(state, getters) {
        return state.basket.length
    },
    basketTotalPrice(state, getters) {
      return getters.basketProducts ? getters.basketProducts.reduce((prevItem, nextItem) => {
        let productTotalPrice2 = +nextItem.price * (+nextItem.quantity)

        return  prevItem + productTotalPrice2
      }, 0) : 0
    }
  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateBasket(state, items) {
      state.basket = items
    },
    updateCartProductAmount(state, product) {
        const basketProduct = state.basket.find(el => el.id == product.id)
          if (basketProduct) {
            basketProduct.quantity = product.quantity;
          }
    },
    updateBasketTotalPrice(state, products) {
      state.basketTotalPrice = state.basket ? products.reduce((acc, item) => {
        let productTotalPrice = +item.price * (+item.quantity)
        return  acc + productTotalPrice
      }, 0) : 0
    }
  },
  actions: {
    getUserAccessKey(context) {
      if (!context.state.userAccessKey) {
        instance.get('/users/accessKey')
          .then(res => {
            localStorage.setItem('userAccessKey', res.data.accessKey)
            context.commit('updateUserAccessKey', res.data.accessKey)
          })
      }
    },
    getBasket(context) {
      console.log(context)

      instance.get('baskets',{
        params: {
          userAccessKey: context.state.userAccessKey
        }
      }).then(res => {
        context.commit('updateBasket', res.data.items)
      })
    },
    addProductToBasket(context, {productId, colorId, sizeId, quantity}) {
      console.log('add')

      instance.post('baskets/products',{
        productId,
        colorId,
        sizeId,
        quantity
      }, {
        params: {
          userAccessKey: localStorage.getItem('userAccessKey')
        }
      }).then(res => {
        console.log(res)
        context.commit('updateBasket', res.data.items)
      })
    },
    updateCartProductAmount(context, {productId, productAmount}) {

      if (!productAmount) return

      instance.put('baskets/products', {
        basketItemId: productId,
        quantity: productAmount
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      }).then(res => {
        context.commit('updateCartProductAmount', res.data)
        context.commit('updateBasket', res.data.items)
      }).catch(e => {
        console.log(e)
      })
    },
    deleteProduct(context, id) {
      console.log(id)
      instance.delete('baskets/products',  {
        params: {
          userAccessKey: context.state.userAccessKey
        },
        data: {
          basketItemId: id
        }
      }).then(res => {
        context.commit('updateBasket', res.data.items)
      })

    }
  },
  modules: {
  },
}
