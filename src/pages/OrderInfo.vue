<template>
  <div>
    <Loader v-if="isLoading"/>
    <RequestError v-else-if="requestError"
                  :error="requestError"

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
import { mapActions, mapGetters } from 'vuex';

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

    };
  },
  mounted() {
    this.getOrderInfo(this.$route.params.id);
    if (this.requestError === 0) {
      this.$router.push({ name: '404' });
    }

  },
  methods: {
    ...mapActions(['getOrderInfo']),
    goToPage() {
      this.$router.push({ name: 'Basket' });
    }
  },
  computed: {
    ...mapGetters(['orderInfo', 'isLoading', 'requestError'])
  }
};
</script>

<style>

</style>
