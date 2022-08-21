<template>
  <div class="cart__block"
       v-if="products.length"
  >
    <div v-if="$route.name == 'Basket' ">
      <div>
        <p class="cart__desc">
          Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
        </p>
        <p class="cart__price">
          Итого: <span>{{ totalPrice | numberFormat }} ₽</span>
        </p>

        <slot></slot>
      </div>

    </div>

    <div v-else>
      <ul class="cart__orders">
        <li class="cart__order"
            v-for="product in products"
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
            {{ products.length }}
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

export default {
  props: ['delivery', 'countError', 'products'],
  computed: {

    totalPrice() {
      let productsTotalPrice = this.products.length ? this.products.reduce((prevItem, nextItem) => {
        let productTotalPrice1 = +nextItem.price * (+nextItem.quantity);

        return prevItem + productTotalPrice1;
      }, 0) : 0;

      return this.delivery ? ((+productsTotalPrice) + (Number(this.delivery.price))) : (+productsTotalPrice);
    },
    declineBasketProductsAmount() {
      return wordDecline(this.products.length, declineProductDict);
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
</style>
