<template>
  <div>
    <Loader v-if="isLoading"/>
    <RequestError v-else-if="orderRequestError"
                  :error="orderRequestError"

    />
    <div v-else>
      <div class="content__top">
        <Breadcrumbs :crumbs="crumbs"
                     @selectedCrumb="goToPage($event)"
        />

        <h1 class="content__title">
          Заказ оформлен <span>№ {{ orderInfo.id }}</span>
        </h1>
      </div>

      <section class="cart">
        <form class="cart__form form"
              action="#"
              method="POST"
        >
          <div class="cart__field">
            <p class="cart__message">
              Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
              Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
            </p>

            <ul class="dictionary">
              <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
                <span class="dictionary__value">
               {{ orderInfo.name }}
              </span>
              </li>
              <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
                <span class="dictionary__value">
                 {{ orderInfo.address }}
              </span>
              </li>
              <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
                <span class="dictionary__value">
               {{ orderInfo.phone }}
              </span>
              </li>
              <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
                <span class="dictionary__value">
               {{ orderInfo.email }}
              </span>
              </li>
              <li class="dictionary__item">
              <span class="dictionary__key">
                Доставка
              </span>
                <span class="dictionary__value"
                      v-if="orderInfo.deliveryType"
                >
                  {{ orderInfo.deliveryType.title }}
              </span>
              </li>
              <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
                <span class="dictionary__value">
                   {{ orderInfo.paymentType }}
              </span>
              </li>
            </ul>
          </div>

          <BasketInfoOrder :delivery="orderInfo.deliveryType"/>
        </form>
      </section>
    </div>

  </div>
</template>

<script>
import BasketInfoOrder from '@/components/Basket/BasketInfoOrder';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Loader from '@/components/UI/Loader/Loader';
import RequestError from '@/components/UI/RequestError';
import instance from '@/axiosConfig';

export default {
  components: {
    BasketInfoOrder,
    Breadcrumbs,
    Loader,
    RequestError
  },
  data() {
    return {
      crumbs: ['Корзина', 'Информация о заказе'],
      orderInfo: '',
      orderRequestError: '',
      isLoading: false
    };
  },
  mounted() {
    this.getOrderInfo();
  },
  methods: {
    getOrderInfo() {
      this.isLoading = true;
      instance.get(`orders/${this.$route.params.id}`, {
        params: {
          orderId: this.$route.params.id
        }
      })
        .then(res => {
          this.orderInfo = res.data;
          this.isLoading = false;
        })
        .catch(e => {
          this.orderRequestError = 'При загрузке информации о заказе произошла ошибка.' +
            'Уточнить информацию о заказе можно позвонив ' +
            'по телефону горячей линии, ' +
            'заказав звонок или отправив письмо на почту'
          this.isLoading = false;
        });
    },
    goToPage() {
      this.$router.push({ name: 'Basket' });
    }
  },
};
</script>

<style>

</style>
