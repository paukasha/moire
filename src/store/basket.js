import Vue from 'vue';
import Vuex from 'vuex';
import instance from '../axiosConfig'

Vue.use(Vuex);

export default {
  state: () => ({
    basket: [],
    basketTotalPrice: 0,
    userAccessKey: '',
  }),
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
      instance.get('baskets',)
        .then(res => {
        context.commit('updateBasket', res.data.items)
      })
    },
    addProductToBasket(context, {productId, colorId, sizeId, quantity}) {
      instance.post('baskets/products',{
        productId,
        colorId,
        sizeId,
        quantity
      }).then(res => {
        console.log(res)
        context.commit('updateBasket', res.data.items)
      })
    },
    updateCartProductAmount(context, {productId, productAmount}) {
      if (productAmount || productId) {
        instance.put('baskets/products', {
          basketItemId: productId,
          quantity: productAmount
        }).then(res => {
          context.commit('updateCartProductAmount', res.data)
          context.commit('updateBasket', res.data.items)
        }).catch(e => {
          console.log(e)
        })
      }
    },
    deleteProduct(context, id) {
      console.log(id)
      instance.delete('baskets/products',  {
        data: {
          basketItemId: id
        }
      }).then(res => {
        context.commit('updateBasket', res.data.items)
      })

    },

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
    },
  },
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

}
