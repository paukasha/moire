import Vue from 'vue';
import Vuex from 'vuex';
import instance from '../axiosConfig';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: () => ({
    orderInfo: '',
    error: '',
    isLoading: false
  }),
  actions: {
    getOrderInfo(context, id) {
      return instance.get(`orders/${id}`, {
        params: {
          orderId: id,
          userAccessKey: localStorage.getItem('userAccessKey')
        }
      });
    },
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    updateRequestError(state, error) {
      state.error = error;
    }
  },
  getters: {
    orderInfo(state) {
      return state.orderInfo;
    },
    isLoading(state) {
      return state.isLoading;
    },
    requestError(state) {
      return state.error;
    }
  }
};
