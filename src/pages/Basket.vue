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
      <ValidationObserver v-slot="{handleSubmit, invalid}">
        <form class="cart__form form">
          <div class="cart__field">
            <ul class="cart__list">
              <BasketProduct v-for="product in basketProducts"
                             :key="product.id"
                             :product="product"

              />
            </ul>
          </div>

          <BasketInfoOrder @redirect="handleSubmit(goToCheckOrder)"
                           :count-error="invalid"

          />
        </form>
      </ValidationObserver>
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
import { ValidationObserver } from 'vee-validate';

import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    BasketProduct,
    BasketInfoOrder,
    Breadcrumbs,
    Loader,
    RequestError,
    ValidationObserver
  },
  data() {
    return {
      crumbs: ['Корзина'],
    };
  },
  mounted() {
    this.getBasket();
  },
  methods: {
    ...mapActions(['getBasket']),
    goToCatalog() {
      this.$router.push({ name: 'MainPage' });
    },
    reloadPage() {
      this.$router.go(0);
    },
    goToCheckOrder(event) {
      this.$router.push({ name: 'Order' });
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
</style>
