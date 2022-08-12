<template>
  <li class="cart__item product"
  >
    <div class="product__pic">
      <img :src="product.color.gallery[0].file.url"
           width="120"
           height="120"
           srcset="img/product-square-4@2x.jpg 2x"
           :alt="product.product.title"
      >
    </div>
    <h3 class="product__title">
      {{ product.product.title }}
    </h3>
    <div class="product__basket-info">
      <div class="product__info product__info--color">
        Цвет:
        <ProductColor class="color"
                      :color="product.color.color"
        />
        {{ colorsDict[product.color.color.code] }}
      </div>

      <p class="product__info ">
        Размер:
        <span>
          {{ product.size.title }}
        </span>
      </p>
    </div>

    <span class="product__code">
      Артикул:  {{ product.product.id }}
    </span>

    <ProductCount :product-count.sync="productCount"
                  @error="error = $event"
    />

    <b v-if="error"
       class="product__price invalid__counter"
    >{{ error }}</b>
    <b v-else
       class="product__price"
    >
      {{ productTotalPrice | numberFormat }} ₽
    </b>


    <button class="product__del button-del"
            type="button"
            aria-label="Удалить товар из корзины"
            @click.prevent="deleteBasketProduct"
    >
      <svg width="20"
           height="20"
           fill="currentColor"
      >
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import ProductCount from '@/components/UI/ProductCounter';
import ProductColor from '@/components/UI/ProductColor';
import numberFormat from '@/helpers/numberFormat';
import { colorsDict } from '@/helpers/wordsDict';
import { mapActions } from 'vuex';

export default {
  props: ['product'],
  components: {
    ProductCount,
    ProductColor
  },
  data() {
    return {
      productTotalPrice: '',
      error: '',
      colorsDict
    };
  },
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteProduct']),

    deleteBasketProduct() {
      this.$store.dispatch('deleteProduct', this.product.id);
    }
  },
  computed: {
    productCount: {
      get() {
        return this.product.quantity;
      },
      set(val) {
        this.productTotalPrice = val * this.product.price;
        this.$store.dispatch('updateCartProductAmount', {
          productId: this.product.id,
          productAmount: val
        });
      }
    },
  },
  filters: {
    numberFormat
  }
};
</script>

<style>
.button-del {
  cursor: pointer;
}

.product__info:first-child {
  margin-right: 10px;
}

.product__basket-info {
  grid-row: 2;
  display: flex;
  align-items: center;
}

.product__info--color {
  display: flex;
  align-items: center;
}

.product__info--color span.colors__value {
  padding-left: 0 !important;
}

.product__info--color label:hover + .colors__value::before {
  border: none;
}

.product__info--color label:hover {
  cursor: default;
}

.invalid__counter {
  font-size: 12px;
  color: red;
}
</style>
