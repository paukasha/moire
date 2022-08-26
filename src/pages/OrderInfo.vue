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
import instance from '@/axiosConfig';

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
  mounted() {
    if (!this.orderInfo) {
      this.isLoading = true;
      this.getOrderInfo(this.$route.params.id)
    }
  },
  methods: {
    ...mapMutations('Order', ['updateOrderInfo']),
    getOrderInfo() {
      return instance.get(`orders/${this.$route.params.id}`, {
        params: {
          orderId: this.$route.params.id,
          userAccessKey: localStorage.getItem('userAccessKey')
        }
      }) .then(res => {
        this.isLoading = false;
        this.updateOrderInfo(res.data);
      })
        .catch((e) => {
          this.isLoading = false;
          this.$router.push({ name: '404' })
            .catch(() => {
            });
        });
    }
  },
watch: {
  '$route.params.id': {
    handler(val) {
      this.getOrderInfo()
    },
    immediate: true
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
