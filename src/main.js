import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate, { Validator, } from 'vee-validate';

Vue.use(VeeValidate);

Vue.config.productionTip = false;

Validator.localize('ru', {
  messages: {
    required: 'Поле является обязательным',
    min_value: () => 'Значение должно быть целым положительным числом и больше нуля',
    min: () => 'Неверный формат',
    numeric: () => 'Поле должно сожержать только цифры',
    email: () => 'Неверный формат'
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
