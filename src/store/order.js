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
      instance.get(`orders/${id}`, {
        params: {
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
