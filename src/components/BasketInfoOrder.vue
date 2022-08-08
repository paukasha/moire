<template >
  <div class="cart__block">
    <ul class="cart__orders">
      <li class="cart__order" v-for="product in basketProducts">
        <h3 >{{ product.product.title }}</h3 >
        <b >{{ product.price * product.quantity | numberFormat}} ₽</b >
        <span >Артикул: {{ product.product.id }}</span >
      </li >

    </ul >

    <div class="cart__total">
      <p >Доставка: <b >бесплатно</b ></p >
      <p >Итого:   <b>{{ basketProducts.length }}</b> {{ declineBasketProductsAmount }} на сумму <b >{{ basketTotalPrice | numberFormat }} ₽</b ></p >
    </div >

    <button class="cart__button button button--primery"
            type="submit"
    >
      Оформить заказ
    </button >
  </div>
</template >

<script >
import numberFormat from '@/helpers/numberFormat';
import wordDecline from "@/helpers/decline";
import { declineProductDict } from "@/helpers/declineWordsDict";
import { mapGetters } from 'vuex';

export default {

  filters: {
    numberFormat
  },
  computed: {
    ...mapGetters(['basketProducts', 'basketTotalPrice']),
    declineBasketProductsAmount() {
      return wordDecline(this.basketProducts.length, declineProductDict)
    },
  }

};
</script >

<style scoped>

</style >
