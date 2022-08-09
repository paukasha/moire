<template >
  <div >
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
                          placeholder="Введите ваше полное имя"/>

            <BaseFieldText title="Адрес"
                           v-model="dataForm.address"
                           rules="required"
                           placeholder="Введите ваш адрес"/>

            <BaseFieldText title="Email"
                           v-model="dataForm.email"
                           rules="required|email"
                           placeholder="Введите ваш email"/>


            <BaseFieldText title="Телефон"
                           v-mask="'+7 (###)-###-##-##'"
                           v-model="dataForm.phone"
                           rules="required"
                           placeholder="Введите ваш телефон"/>


              <BaseFieldTextArea title="Комментарий к заказу"
                                 v-model="dataForm.comment"
                                 placeholder="Ваши пожелания"
              />


          </div >

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3 >
            <ul class="cart__options options">
              <li class="options__item"
                  v-for="delivery in deliveries"
                  :key="delivery.id">
                <label class="options__label"
              >
                  <input class="options__radio sr-only"
                         type="radio"
                         name="delivery"
                         :value="delivery"
                         v-model="selectedDelivery"

                  >
                  <span class="options__value">
                    {{ delivery.title }}
                    <b v-if="delivery.price == 0">Бесплатно</b >
                    <b v-else
                    >{{ delivery.price | numberFormat}} руб</b >
                  </span >
                </label >
              </li >

            </ul >

            <h3 class="cart__title">Оплата</h3 >
            <ul class="cart__options options">
              <li class="options__item" v-for="payment in payments"
              :key="payment.id">
                <label class="options__label">
                  <input class="options__radio sr-only"
                         type="radio"
                         name="pay"
                         :value="payment"
                         v-model="selectedPayment"
                  >
                  <span class="options__value">
                    {{ payment.title }}
                  </span >
                </label >
              </li >

            </ul >
          </div >
        </div >

        <BasketInfoOrder :delivery="selectedDelivery">
          <button class="cart__button button button--primery"
                  type="submit">
            Оформить заказ
          </button >
        </BasketInfoOrder>

        <div class="cart__error form__error-block">
          <h4 >Заявка не отправлена!</h4 >
          <p >
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p >
        </div >
      </form >
        </ValidationObserver>
    </section >
  </div >

</template >

<script >
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import { mapGetters, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import wordDecline from "@/helpers/decline";
import { declineProductDict } from "@/helpers/declineWordsDict";
import BaseFormField from '@/components/Form/BaseFormField'
import BaseFieldText from '@/components/Form/BaseFieldText'
import BaseFieldTextArea from '@/components/Form/BaseFieldTextArea'
import BasketInfoOrder from '@/components/Basket/BasketInfoOrder'
import instance from '@/axiosConfig';
import { ValidationProvider,ValidationObserver , extend  } from 'vee-validate';
import { email, digits, integer, required } from 'vee-validate/dist/rules';
import {mask} from 'vue-the-mask'

extend('required', {
  ...required,
  message: 'Поле не может быть пустым'
})

extend('email', {
  ...email,
  message: 'Некорректный email'
})

export default {
  components: {
    Breadcrumbs,
    BaseFormField,
    BaseFieldText,
    BaseFieldTextArea,
    BasketInfoOrder,
    ValidationProvider,
    ValidationObserver
  },
  directives: {mask},
  data() {
    return {
      crumbs: ['Корзина', 'Оформить заказ' ],
      deliveries: [],
      selectedDelivery: '',
      payments: [],
      selectedPayment: '',
      dataForm: {
        name: '',
        address: '',
        phone: '',
        email: '',
        comment: ''
      },

    };
  },
  mounted() {
    this.getDeliveries()
  },
  computed: {


  },
  watch: {
    selectedDelivery(val) {
      this.getPayments(val.id)
    }
  },
  methods: {
    ...mapMutations(['updateBasket']),
    goToPage(event) {
      this.$router.push({ name: 'Basket' })
    },
    getDeliveries() {
      instance.get('deliveries')
        .then(res => {
          this.deliveries = res.data
          this.selectedDelivery = res.data[0]
        }).catch(e => {
          console.log(e)
      })
    },
    getPayments(deliveryId) {
      instance.get('payments', {
        params: {
          deliveryTypeId: deliveryId
        }
      })
        .then(res => {
          this.payments = res.data
          this.selectedPayment = res.data[0]
        }).catch(e => {
        console.log(e)
      })
    },
    createOrder() {
      let dataForm = Object.assign({}, this.dataForm, {
        deliveryTypeId: this.selectedDelivery.id,
        paymentTypeId: this.selectedPayment.id
      })
      instance.post('orders', dataForm, ).then(res => {
        this.$router.push({name: 'OrderInfoPage', params: {
            id: res.data.id
          }})
        this.$store.commit('updateBasket', [])
      })
    }
  },
  filters: {
    numberFormat
  }
};
</script >

<style scoped>

</style >
