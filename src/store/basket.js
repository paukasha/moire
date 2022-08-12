import Vue from 'vue';
import Vuex from 'vuex';
import instance from '../axiosConfig';

Vue.use(Vuex);

export default {
  state: () => ({
    basket: [],
    basketTotalPrice: 0,
    userAccessKey: '',
    requestError: '',
    isLoading: false
  }),
  actions: {
    getUserAccessKey(context) {
      instance.get('/users/accessKey')
        .then(res => {
          localStorage.setItem('userAccessKey', res.data.accessKey);
          context.commit('updateUserAccessKey', res.data.accessKey);
        });
    },
    getBasket(context) {
      context.state.isLoading = true;
      instance.get('baskets', {
        params: {
          userAccessKey: localStorage.getItem('userAccessKey')
        }
      })
        .then(res => {
          context.state.isLoading = false;
          context.commit('updateBasket', res.data.items);
        })
        .catch(e => {
          context.state.isLoading = false;
          context.state.requestError = 'При загрузке корзины произошла ошибка';
        });
    },
    addProductToBasket(context, {
      productId,
      colorId,
      sizeId,
      quantity
    }) {
      instance.post('baskets/products', {
        productId,
        colorId,
        sizeId,
        quantity
      }, {
        params: {
          userAccessKey: localStorage.getItem('userAccessKey')
        }
      })
        .then(res => {
          context.commit('updateBasket', res.data.items);
        })
        .catch(e => {
          let error = 'При добавлении товара в корзину произошла ошибка. Пожалуйста, обновите страницу ';
          context.commit('updateRequestError', error);
        });
    },
    updateCartProductAmount(context, {
      productId,
      productAmount
    }) {
      if (productAmount && productId && typeof productAmount == 'number') {
        instance.put('baskets/products', {
          basketItemId: productId,
          quantity: Math.abs(productAmount)
        }, {
          params: {
            userAccessKey: localStorage.getItem('userAccessKey')
          }
        })
          .then(res => {
            context.commit('updateCartProductAmount', res.data);
            context.commit('updateBasket', res.data.items);
          })
          .catch(e => {
            let error = 'При добавлении товара в корзину произошла ошибка. Пожалуйста, обновите страницу ';
            context.commit('updateRequestError', error);
          });
      }
    },
    deleteProduct(context, id) {
      instance.delete('baskets/products', {
        params: {
          userAccessKey: localStorage.getItem('userAccessKey')
        },
        data: {
          basketItemId: id
        }
      })
        .then(res => {
          context.commit('updateBasket', res.data.items);
        });

    },

  },
  mutations: {
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateBasket(state, items) {
      state.basket = items;
    },
    updateCartProductAmount(state, product) {
      const basketProduct = state.basket.find(el => el.id == product.id);
      if (basketProduct) {
        basketProduct.quantity = product.quantity;
      }
    },
    updateBasketTotalPrice(state, products) {
      state.basketTotalPrice = state.basket ? products.reduce((acc, item) => {
        let productTotalPrice = +item.price * (+item.quantity);
        return acc + productTotalPrice;
      }, 0) : 0;
    },
    updateRequestError(state, error) {
      state.requestError = error;
    }
  },
  getters: {
    basketProducts(state, getters) {
      return state.basket;
    },
    productsQuantity(state, getters) {
      return state.basket.length;
    },
    allProductsQuantity(state) {
      return state.basket.reduce((acc, nextVal) => {
        return acc + nextVal.quantity;
      }, 0);
    },
    basketTotalPrice(state, getters) {
      return getters.basketProducts ? getters.basketProducts.reduce((prevItem, nextItem) => {
        let productTotalPrice2 = +nextItem.price * (+nextItem.quantity);

        return prevItem + productTotalPrice2;
      }, 0) : 0;
    },
    requestErrors(state) {
      return state.requestError;
    }
  },

};
