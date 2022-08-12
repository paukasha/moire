import Vue from 'vue';
import Vuex from 'vuex';
import instance from '../axiosConfig';

Vue.use(Vuex);

export default {
  state: () => ({
    orderInfo: {},
    requestError: '',
    isLoading: false
  }),
  actions: {
    getOrderInfo(context, id) {
      context.state.isLoading = true;
      instance.get(`orders/${id}`, {
        params: {
          orderId: id,
          userAccessKey: localStorage.getItem('userAccessKey')
        }
      })
        .then(res => {
          context.commit('updateOrderInfo', res.data);
          context.state.isLoading = false;
        })
        .catch(e => {
          context.commit('updateRequestError', e.response);
          context.state.isLoading = false;
        });
    },
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    updateRequestError(state, error) {
      let requestError = error
      if (requestError === 0) {
        requestError = error.data.code
      } else {
        requestError = 'При загрузке информации о заказе произошла ошибка.' +
          'Уточнить информацию о заказе можно позвонив ' +
          'по телефону горячей линии, ' +
          'заказав звонок или отправив письмо на почту';

      }
      state.requestError = requestError;
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
      return state.requestError;
    }
  }
};
