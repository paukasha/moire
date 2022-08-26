<template>
  <div>
    <Loader v-if="isLoading"/>
    <div v-else>
      <div class="content__top">
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

          <BasketInfoOrder :products="orderInfoBasket"
                           :delivery="orderInfo.deliveryType"
          />
        </form>
      </section>
    </div>

  </div>
</template>

<script>
import BasketInfoOrder from '@/components/Basket/BasketInfoOrder';
import Loader from '@/components/UI/Loader/Loader';
import RequestError from '@/components/UI/RequestError';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    BasketInfoOrder,
    Loader,
    RequestError
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    ...mapActions('Order', ['getOrderInfo']),
    ...mapMutations('Order', ['updateOrderInfo']),
  },
  watch: {
    '$route.params.id': {
      handler(val) {
        this.isLoading = true;
        this.getOrderInfo(this.$route.params.id)
          .then(res => {
            this.isLoading = false;
            this.updateOrderInfo(res.data);
          })
          .catch(() => {
            this.isLoading = false;
            this.$router.push({ name: '404' })
              .catch(() => {
              });
          });
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters('Order', ['orderInfo', 'requestError']),
    orderInfoBasket() {
      return this.orderInfo ? this.orderInfo.basket.items : [];
    }
  }
};
</script>

<style>

</style>
