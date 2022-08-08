import Vue from 'vue';
import Vuex from 'vuex';
import instance from '../axiosConfig'

Vue.use(Vuex);

export default {

  state: () => ({
    orderInfo: {}
  }),
  actions: {
    getOrderInfo(context, id) {
      // if (!id) return
      instance.get(`orders/1096`, {
        params: {
          userAccessKey: context.rootState.Basket.userAccessKey,
          orderId: id
        }
      }).then(res=> {
          context.commit('updateOrderInfo', res.data)
        })
    }
  },
  mutations: {
      updateOrderInfo(state, order) {
        state.orderInfo = order
      }
  },
  getters: {

  }
}
