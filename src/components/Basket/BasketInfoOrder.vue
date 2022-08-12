<template>
  <div class="cart__block"
       v-if="basketProducts.length"
  >
    <div v-if="$route.name == 'Basket'">
      <p class="cart__desc">
        Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
      </p>
      <p class="cart__price">
        Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
      </p>

      <button @click.prevent="$emit('redirect', $event)"
              class="cart__button button button--primery"
              :disabled="countError"
              :title="invalidProductCount"
      >
        Оформить заказ
      </button>
    </div>

    <div v-else>
      <ul class="cart__orders">
        <li class="cart__order"
            v-for="product in basketProducts"
        >
          <h3>
            {{ product.product.title }}
          </h3>
          <b>
            {{ product.price * product.quantity | numberFormat }} ₽
          </b>
          <span>Артикул: {{ product.product.id }}</span>
        </li>
      </ul>

      <div class="cart__total">
        <p>
          Доставка:
          <b v-if="delivery">
            {{ delivery.title }}
          </b>
        </p>
        <p>
          Итого:
          <b>
            {{ basketProducts.length }}
          </b>
          {{ declineBasketProductsAmount }} на сумму
          <b>
            {{ totalPrice | numberFormat }} ₽
          </b>
        </p>
      </div>

      <slot></slot>
    </div>

  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import wordDecline from '@/helpers/decline';
import { declineProductDict } from '@/helpers/wordsDict';

import { mapGetters } from 'vuex';

export default {
  props: ['delivery', 'countError'],
  computed: {
    ...mapGetters(['basketProducts', 'basketTotalPrice']),
    totalPrice() {
      return this.delivery ? ((+this.basketTotalPrice) + (Number(this.delivery.price))) : (+this.basketTotalPrice);
    },
    declineBasketProductsAmount() {
      return wordDecline(this.basketProducts.length, declineProductDict);
    },
    invalidProductCount() {
      return this.countError ? 'Пожалуйста, проверьте введенные данные' : '';
    }
  },
  filters: {
    numberFormat
  },

};
</script>

<style scoped>
.cart__button {
  text-align: center;
}
</style>
