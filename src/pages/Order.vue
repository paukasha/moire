<template >
  <div >
    <Breadcrumbs :crumbs="crumbs"
                 @selectedCrumb="goToPage($event)"
    />
    <section class="cart">
      <form class="cart__form form"
            @submit.prevent="createOrder"
      >
        <div class="cart__field">
          <div class="cart__data">

              <BaseFieldText title="ФИО"
                              v-model="dataForm.name"
                             :error="formError.name"
                          placeholder="Введите ваше полное имя"/>

            <BaseFieldText title="Адрес"
                           v-model="dataForm.address"
                           :error="formError.address"
                           placeholder="Введите ваш адрес"/>

            <BaseFieldText title="Email"
                           v-model="dataForm.email"
                           :error="formError.email"
                           placeholder="Введите ваш email"/>


            <BaseFieldText title="Телефон"
                           v-model="dataForm.phone"
                           :error="formError.phone_number"
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
                         :value="delivery.id"
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
                         :value="payment.id"
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

        <BasketInfoOrder />
<!--        <div class="cart__block">-->
<!--          <ul class="cart__orders">-->
<!--            <li class="cart__order" v-for="product in basketProducts">-->
<!--              <h3 >{{ product.product.title }}</h3 >-->
<!--              <b >{{ product.price * product.quantity | numberFormat}} ₽</b >-->
<!--              <span >Артикул: {{ product.product.id }}</span >-->
<!--            </li >-->

<!--          </ul >-->

<!--          <div class="cart__total">-->
<!--            <p >Доставка: <b >бесплатно</b ></p >-->
<!--            <p >Итого:   <b>{{ basketProducts.length }}</b> {{ declineBasketProductsAmount }} на сумму <b >{{ basketTotalPrice | numberFormat }} ₽</b ></p >-->
<!--          </div >-->

<!--          <button class="cart__button button button&#45;&#45;primery"-->
<!--                  type="submit"-->
<!--          >-->
<!--            Оформить заказ-->
<!--          </button >-->
<!--        </div>-->


        <div class="cart__error form__error-block">
          <h4 >Заявка не отправлена!</h4 >
          <p >
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p >
        </div >
      </form >
    </section >
  </div >

</template >

<script >
import Breadcrumbs from '@/components/Breadcrumbs';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import wordDecline from "@/helpers/decline";
import { declineProductDict } from "@/helpers/declineWordsDict";
import BaseFormField from '@/components/BaseFormField'
import BaseFieldText from '@/components/BaseFieldText'
import BaseFieldTextArea from '@/components/BaseFieldTextArea'
import BasketInfoOrder from '@/components/BasketInfoOrder'
import instance from '@/axiosConfig';

export default {
  components: {
    Breadcrumbs,
    BaseFormField,
    BaseFieldText,
    BaseFieldTextArea,
    BasketInfoOrder
  },
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
      formError: {
        name: 'Поле не может быть пустым',
        address: 'Поле не может быть пустым',
        email: 'Поле не может быть пустым',
        phone_number: 'Неверный формат'
      }
    };
  },
  mounted() {
    this.getDeliveries()
  },
  computed: {


  },
  watch: {
    selectedDelivery(val) {
      this.getPayments(val)
    }
  },
  methods: {
    goToPage(event) {
      this.$router.push({ name: 'Basket' })
    },
    getDeliveries() {
      instance.get('deliveries')
        .then(res => {
          this.deliveries = res.data
          this.selectedDelivery = res.data[0].id
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
          this.selectedPayment = res.data[0].id
        }).catch(e => {
        console.log(e)
      })
    },
    createOrder() {
      let dataForm = Object.assign({}, this.dataForm, {
        deliveryTypeId: this.selectedDelivery,
        paymentTypeId: this.selectedPayment
      })
      instance.post('orders', dataForm, {
        params: {
          userAccessKey: this.$store.state.Basket.userAccessKey
        }
      }).then(res => {
        this.$router.push({name: 'OrderInfoPage', params: {
            id: res.data.id
          }})
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
