<template>
  <div>
    <div class="content__top">
      <Breadcrumbs :crumbs="crumbs"
                   @selectedCrumb="goToPage($event)"
      />
    </div>

    <section class="cart">
      <ValidationObserver v-slot="{handleSubmit}">
        <form class="cart__form form"
              @submit.prevent="handleSubmit(createOrder)"
        >
          <div class="cart__field">
            <div class="cart__data">
              <BaseFieldText title="ФИО"
                             v-model="dataForm.name"
                             rules="required"
                             placeholder="Введите ваше полное имя"
              />

              <BaseFieldText title="Адрес"
                             v-model="dataForm.address"
                             rules="required"
                             placeholder="Введите ваш адрес"
              />

              <BaseFieldText title="Email"
                             v-model="dataForm.email"
                             rules="required|email"
                             placeholder="Введите ваш email"
              />

              <BaseFieldText title="Телефон"
                             v-mask="'+7 (###)-###-##-##'"
                             v-model="dataForm.phone"
                             rules="required|min:18"
                             placeholder="Введите ваш телефон"
              />

              <BaseFieldTextArea title="Комментарий к заказу"
                                 v-model="dataForm.comment"
                                 placeholder="Ваши пожелания"
              />
            </div>

            <Loader v-if="isLoading"/>
            <div v-else
                 class="cart__options"
            >
              <h3 class="cart__title">Доставка</h3>
              <div v-if="errors.deliveryError"
                   class="cart__options options"
              >
                {{ errors.deliveryError }}
              </div>
              <ul v-else
                  class="cart__options options"
              >
                <li class="options__item"
                    v-for="delivery in deliveries"
                    :key="delivery.id"
                >
                  <label class="options__label">
                    <input class="options__radio sr-only"
                           type="radio"
                           name="delivery"
                           :value="delivery"
                           v-model="selectedDelivery"
                    >
                    <span class="options__value">
                    {{ delivery.title }}
                    <b v-if="delivery.price == 0">Бесплатно</b>
                    <b v-else>{{ delivery.price | numberFormat }} руб</b>
                  </span>
                  </label>
                </li>
              </ul>

              <h3 class="cart__title">Оплата</h3>
              <div v-if="errors.deliveryError">Наличный расчет / банковская карта</div>
              <ul class="cart__options options">
                <li class="options__item"
                    v-for="payment in payments"
                    :key="payment.id"
                >
                  <label class="options__label">
                    <input class="options__radio sr-only"
                           type="radio"
                           name="pay"
                           :value="payment"
                           v-model="selectedPayment"
                    >
                    <span class="options__value">
                    {{ payment.title }}
                  </span>
                  </label>
                </li>

              </ul>
            </div>
          </div>

          <BasketInfoOrder :delivery="selectedDelivery">
            <button class="cart__button button button--primery"
                    type="submit"
            >
              Оформить заказ
            </button>
          </BasketInfoOrder>

          <div class="cart__error form__error-block"
               v-if="errors.requestOrderError"
          >
            <h4>Заявка не отправлена!</h4>
            <p>
              Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
            </p>
            <RequestError
              @load="createOrder"
            />
          </div>
        </form>
      </ValidationObserver>
    </section>
  </div>

</template>

<script>
import instance from '@/axiosConfig';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { email, min, required, } from 'vee-validate/dist/rules';

import Breadcrumbs from '@/components/UI/Breadcrumbs';
import BaseFormField from '@/components/Form/BaseFormField';
import BaseFieldText from '@/components/Form/BaseFieldText';
import BaseFieldTextArea from '@/components/Form/BaseFieldTextArea';
import BasketInfoOrder from '@/components/Basket/BasketInfoOrder';
import Loader from '@/components/UI/Loader/Loader';
import RequestError from '@/components/UI/RequestError';

import numberFormat from '@/helpers/numberFormat';

import { mask } from 'vue-the-mask';

import { mapMutations } from 'vuex';

export default {
  components: {
    Breadcrumbs,
    BaseFormField,
    BaseFieldText,
    BaseFieldTextArea,
    BasketInfoOrder,
    Loader,
    RequestError,
    ValidationProvider,
    ValidationObserver
  },
  directives: { mask },
  data() {
    return {
      crumbs: ['Корзина', 'Оформить заказ'],
      deliveries: [],
      selectedDelivery: '',
      payments: [],
      selectedPayment: '',
      dataForm: {
        name: '',
        address: '',
        phone: '',
        email: '',
        comment: '',
      },
      errors: {
        deliveryError: '',
        paymentsError: '',
        requestOrderError: ''
      },
      isLoading: false

    };
  },
  mounted() {
    this.getDeliveries();
    extend('required', {
      ...required,
      message: 'Поле не может быть пустым'
    });

    extend('min', {
      ...min,
      message: 'Неверный формат'
    });

    extend('email', {
      ...email,
      message: 'Некорректный email'
    });
  },
  methods: {
    ...mapMutations(['updateBasket']),
    goToPage(event) {
      this.$router.push({ name: 'Basket' });
    },
    getDeliveries() {
      this.isLoading = true;
      instance.get('deliveries')
        .then(res => {
          this.isLoading = false;
          this.deliveries = res.data;
          this.selectedDelivery = res.data[0];
        })
        .catch(e => {
          this.isLoading = false;
          this.errors.deliveryError = 'К сожалению, доставка курьером временно не доступна.' +
            'Приносим извинения за доставленные неудобства. Мы всегда рады видеть Вас в нашем магазине :)';
        });
    },
    getPayments(deliveryId) {
      this.isLoading = true;
      instance.get('payments', {
        params: {
          deliveryTypeId: deliveryId
        }
      })
        .then(res => {
          this.isLoading = false;
          this.payments = res.data;
          this.selectedPayment = res.data[0];
        })
        .catch(e => {
          this.isLoading = false;
        });
    },
    createOrder() {
      this.isLoading = true;
      let dataForm = Object.assign({}, this.dataForm, {
        deliveryTypeId: this.selectedDelivery.id,
        paymentTypeId: this.selectedPayment.id
      });
      instance.post('orders', dataForm, { params: {
          userAccessKey: localStorage.getItem('userAccessKey')
        }})
        .then(res => {
          this.isLoading = false;
          this.$router.push({
            name: 'OrderInfoPage',
            params: {
              id: res.data.id
            }
          });
          this.$store.commit('updateBasket', []);
        })
        .catch(e => {
          this.errors.requestOrderError = true;
          this.isLoading = false;
        });
    }
  },
  watch: {
    selectedDelivery(val) {
      this.getPayments(val.id);
    }
  },
  filters: {
    numberFormat
  }
};
</script>

<style scoped>
.form__error-block p {
  display: inline-block;
  margin-bottom: 20px;
}
</style>
