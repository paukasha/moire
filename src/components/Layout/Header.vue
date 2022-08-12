<template>
  <header class="header container">
    <div class="header__wrapper">
      <span class="header__info">
         <router-link :to="{name: 'MainPage', path: '/'}">
           Каталог</router-link>
      </span>

      <router-link :to="{name: 'MainPage', path: '/'}"
                   class="header__logo"
      >
        <img src="img/svg/logo-moire.svg"
             alt="Логотип интернет магазина Moire"
             width="116"
             height="34">
      </router-link>

      <a class="header__tel"
         href="tel:8 800 600 90 09">
        8 800 600 90 09
      </a>

      <router-link :to="{name: 'Basket', path:'/basket'}"
                   class="header__cart"
                   aria-label="Корзина с товарами">
        <svg width="19"
             height="24">
          <use xlink:href="#icon-cart"></use>
        </svg>
        <span class="header__count"
              :class="{'productAdded': isProductAddToCart }" ref="cartIndicator"
              aria-label="Количество товаров">{{ productsQuantity }}</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      isProductAddToCart: false
    }
  },
  watch: {
    allProductsQuantity(val) {
      this.isProductAddToCart = true

      clearTimeout(this.productAdd)
      this.productAdd = setInterval(() => {
         this.isProductAddToCart= false
      },400)
    }
  },
  computed: {
    ...mapGetters(['productsQuantity', 'allProductsQuantity'])
  }
};
</script>

<style>

.header {
  background-color: #fff;
  position: fixed;
  z-index: 55;
  width: 100%;
}

.header__wrapper {
  width: 1200px !important;
  margin: 0 auto !important;
}

.productAdded {
  animation: product-added .4s linear;
}

@keyframes product-added {
  0% {
    width: 13px;
    height: 13px;
  }
  50% {
    width: 20px;
    height: 20px;
  }

  100%{
    width: 13px;
    height: 13px;
  }
}
</style>
