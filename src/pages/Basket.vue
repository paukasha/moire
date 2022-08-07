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
        <span class="content__info">
          {{ basketProducts.length }} {{ declineBasketProductsAmount }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" >
        <div class="cart__field">
          <ul class="cart__list">

            <BasketProduct  v-for="product in basketProducts"
                            :key="product.id"
                            :product="product"/>

          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ basketTotalPrice | numberFormat}} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
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

</style >
