import Vue from 'vue';
import Vuex from 'vuex';
import Basket from './basket';
import Order from './order';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    perPage: 3
  }),
  modules: {
    Basket,
    Order
  },
});
