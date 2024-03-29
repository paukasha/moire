<template>
  <div>
    <div class="content__top">
      <Breadcrumbs :crumbs="crumbs"/>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>

        <span class="content__info"
              v-if="basketProducts.length"
        >
          {{ basketProducts.length }} {{ declineBasketProductsAmount }}
        </span>

        <div v-else
             class="empty-basket"
        >
           <span class="content__info">
          Ваша корзина пуста
        </span>
          <button class="empty-basket__btn"
                  type="button"
                  @click.prevent="goToCatalog"
          >
            Перейти в каталог
          </button>
        </div>
      </div>
    </div>

    <Loader v-if="$store.state.Basket.isLoading"/>

    <RequestError v-else-if="$store.state.Basket.requestError"
                  :error="$store.state.Basket.requestError"
                  @load="reloadPage"
    />

    <section v-else
             class="cart"
             :style="!basketProducts.length ? {height: '240px'} : ''"
    >

      <div class="cart__field">
        <ul class="cart__list">
          <BasketProduct
            v-for="product in basketProducts"
            :key="product.id"
            :product="product"
            @emit-error-counter="errorCounter = $event"
          />
        </ul>
      </div>

      <BasketInfoOrder :products="basketProducts">
        <button class="cart__button button button--primery"
                :disabled="errorCounter != ''"
                @click.prevent="goToCheckOrder"
        >
          Оформить заказ
        </button>

        <button @click.prevent="resetBasket"
                type="button"
                class="cart__button  button--reset"
        >
          Очистить корзину
        </button>
      </BasketInfoOrder>

    </section>
  </div>
</template>

<script>
import BasketInfoOrder from '@/components/Basket/BasketInfoOrder';
import BasketProduct from '@/components/Basket/BasketProduct';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Loader from '@/components/UI/Loader/Loader';
import RequestError from '@/components/UI/RequestError';

import numberFormat from '@/helpers/numberFormat';
import wordDecline from '@/helpers/decline';
import { declineProductDict } from '@/helpers/wordsDict';

import { mapActions, mapGetters, mapMutations } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  components: {
    BasketProduct,
    BasketInfoOrder,
    Breadcrumbs,
    Loader,
    RequestError,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      crumbs: ['Корзина'],
      errorCounter: ''
    };
  },
  methods: {
    ...mapActions(['getBasket', 'getUserAccessKey']),
    ...mapMutations(['updateBasket']),
    goToCatalog() {
      this.$router.push({ name: 'MainPage' });
    },
    reloadPage() {
      this.$router.go(0);
    },
    goToCheckOrder() {
      this.$router.push({ name: 'Order' });
    },
    resetBasket() {
      this.getUserAccessKey();
      this.$store.commit('updateBasket', []);
    }
  },
  computed: {
    ...mapGetters(['basketProducts', 'basketTotalPrice']),
    declineBasketProductsAmount() {
      return wordDecline(this.basketProducts.length, declineProductDict);
    },
  },
  filters: {
    numberFormat
  }
};
</script>

<style scoped>
.cart__button {
  text-align: center;
}

.cart {
  display: grid;
  grid-template-columns: 1fr 344px;
  gap: 60px;
}

.empty-basket {
  display: flex;
  align-items: center;
}

.content__info {
  white-space: nowrap;
}

.empty-basket__btn {
  outline: none;
  border: none;
  margin: 0 20px;
  background-color: #e02d71;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow .3s linear;
}

.empty-basket__btn:hover {
  box-shadow: 2px 2px 6px #e02d7170;
  transition: box-shadow .3s linear;
}

.button--reset {
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
}
</style>
