<template >
  <div>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link to="/" class="breadcrumbs__link" >
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info" v-if="basketProducts.length">
          {{ basketProducts.length }} {{ declineBasketProductsAmount }}
        </span>
        <span class="content__info" v-else>
          Ваша корзина пуста
        </span>
      </div>
    </div>

    <section class="cart" :style="!basketProducts.length ? {height: '240px'} : ''">
      <form class="cart__form form" >
        <div class="cart__field">
          <ul class="cart__list">
            <BasketProduct  v-for="product in basketProducts"
                            :key="product.id"
                            :product="product"/>
          </ul>
        </div>

        <div class="cart__block" v-if="basketProducts.length">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ basketTotalPrice | numberFormat}} ₽</span>
          </p>

          <router-link :to="{name: 'Order', path: 'order'}"
                       class="cart__button button button--primery" >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </div>
</template >

<script >
import { mapGetters } from 'vuex';
import wordDecline from "@/helpers/decline";
import { declineProductDict } from "@/helpers/declineWordsDict";

import BasketProduct from '@/components/BasketProduct'
import numberFormat from '@/helpers/numberFormat';

export default {
  components:{
    BasketProduct
  },
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    ...mapGetters(['basketProducts', 'basketTotalPrice']),
    declineBasketProductsAmount() {
      return wordDecline(this.basketProducts.length, declineProductDict)
    },


  },
  filters: {
    numberFormat
  }
};
</script >

<style scoped>
.cart__button {
  text-align: center;
}

</style >
