<template>
  <div>
    <div class="content__top">
      <Breadcrumbs :crumbs="crumbs"/>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>

        <span class="content__info"
              v-if="basketProducts.length">
          {{ basketProducts.length }} {{ declineBasketProductsAmount }}
        </span>

        <span class="content__info"
              v-else>
          Ваша корзина пуста
        </span>
      </div>
    </div>

    <section class="cart"
             :style="!basketProducts.length ? {height: '240px'} : ''">

      <form class="cart__form form">
        <div class="cart__field">
          <ul class="cart__list">
            <BasketProduct v-for="product in basketProducts"
                           :key="product.id"
                           :product="product"
            />
          </ul>
        </div>

        <BasketInfoOrder/>
      </form>
    </section>
  </div>
</template>

<script>
import BasketInfoOrder from '@/components/Basket/BasketInfoOrder';
import BasketProduct from '@/components/Basket/BasketProduct';
import Breadcrumbs from '@/components/UI/Breadcrumbs';

import numberFormat from '@/helpers/numberFormat';
import wordDecline from '@/helpers/decline';
import { declineProductDict } from '@/helpers/wordsDict';

import { mapGetters } from 'vuex';

export default {
  components: {
    BasketProduct,
    BasketInfoOrder,
    Breadcrumbs,
  },
  data() {
    return {
      crumbs: ['Корзина'],
    };
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
</style>
