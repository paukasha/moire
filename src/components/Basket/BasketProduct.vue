<template >
  <li class="cart__item product"
     >
    <div class="product__pic">
      <img :src="product.color.gallery[0].file.url" width="120" height="120" srcset="img/product-square-4@2x.jpg 2x" alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ product.product.title }}
    </h3>
    <div class="product__basket-info">
      <p class="product__info product__info--color">
        Цвет:
        <span>
                  <i :style="[{backgroundColor: product.color.color.code,
                               border: product.color.color.code == '#ffffff' ? '.5px solid #000' : '',
                                      }]"
                  ></i>
                  {{ product.color.color.title }}
                </span>
      </p>

      <p class="product__info ">
        Размер:
        <span>{{ product.size.title }}</span>
      </p>
    </div>

    <span class="product__code">
                Артикул:  {{ product.product.id }}
              </span>

    <ProductCount :product-count.sync="productCount"
                 />

    <b class="product__price">
      {{ productTotalPrice | numberFormat }} ₽
    </b>

    <button class="product__del button-del"
            type="button"
            aria-label="Удалить товар из корзины"
    @click.prevent="deleteBasketProduct">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template >

<script >
import ProductCount from '@/components/UI/ProductCounter'
import { mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
export default {
  components: {
    ProductCount
  },
  data() {
    return {
      productTotalPrice : ''
    }
  },

  props: ['product'],
  methods: {
    ...mapActions(['updateCartProductAmount', 'deleteProduct']),
    deleteBasketProduct() {
        this.$store.dispatch('deleteProduct', this.product.id)
    }
  },
  watch: {
    productCount(val) {
      console.log(val)
    }
  },

  computed: {
    productCount: {
      get() {
          return this.product.quantity
      }, set(val) {
        this.productTotalPrice = val*this.product.price
          this.$store.dispatch('updateCartProductAmount', {
            productId: this.product.id,
            productAmount: val
          })

      }
    },

  },
  filters: {
    numberFormat
  }
};
</script >

<style scoped>
.button-del {
  cursor: pointer;
}

.product__info:first-child {
  margin-right: 10px;
}
.product__basket-info {
  grid-row: 2;
  display: flex;
}
</style >
