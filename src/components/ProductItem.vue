<template>
  <li class="catalog__item">
    <div class="request-error"
         v-if="requestError"
    >{{ requestError }}
    </div>
    <router-link
      :to="{ name: 'ProductPage', params: { id: product.id } }"
      class="catalog__pic"
      :style="perpage == 9 ? {height: '240px'} : ''"
      href="#"
    >
      <img :src="selectedImageSrc || './img/no_image.jpg'"
           :alt="product.title"
           :style="perpage == 9 ? {height: '100%'} : ''"
      />

      <button class="add-basket__btn"
              type="button"
              @click.prevent="addToBasket"
              v-if="!requestError"
      >В корзину
      </button>
      <div class="plus-product"
           :class="{'is-plus-product': isPlusProduct }"
      >+1
      </div>
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black">
      <li class="colors__item"
          v-for="color in product.colors"
          :key="color.id"
      >
        <ProductColor :color="color.color"
                      :selected-color.sync="selectedColor"
        />
      </li>

    </ul>
  </li>
</template>

<script>
import ProductColor from '@/components/UI/ProductColor';
import numberFormat from '@/helpers/numberFormat';
import { changeImageColor } from '@/helpers/changeImageColor';
import { mapActions } from 'vuex';
import instance from '@/axiosConfig';

export default {
  props: ['product', 'perpage'],
  components: {
    ProductColor
  },
  methods: {
    ...mapActions(['addProductToBasket']),
    addToBasket() {
      instance.get(`products/${this.product.id}`)
        .then(res => {
          this.isPlusProduct = true;
          this.addProductToBasket({
            productId: res.data.id,
            colorId: this.selectedColor.id,
            sizeId: res.data.sizes[0].id,
            quantity: 1
          });

          clearTimeout(this.productAdd);
          this.productAdd = setInterval(() => {
            this.isPlusProduct = false;
          }, 2000);
        })
        .catch(e => {
          this.isPlusProduct = false;
          this.requestError = 'При добавлении товара произошла ошибка. Обновите, пожалуйста, страницу';
        });
    },
  },
  data() {
    return {
      selectedColor: '',
      isPlusProduct: false,
      requestError: ''
    };
  },
  mounted() {
    this.selectedColor = this.product.colors[0].color;
  },
  computed: {
    selectedImageSrc() {
      if (this.selectedColor) {
        let product = this.product.colors.find((el) => el.color.code === this.selectedColor.code);
        return changeImageColor(product);
      }
    },
  },
  filters: {
    numberFormat,
  },
};
</script>

<style scoped>
.catalog__item {
  position: relative;
}

.catalog__item:hover .add-basket__btn {
  opacity: 1;
  transition: opacity .4s linear;
}

.catalog__pic {
  position: relative;
}

.add-basket__btn {
  opacity: 0;
  position: absolute;
  z-index: 50;
  left: 0;
  bottom: 0;
  right: 0;
  height: 40px;
  border: none;
  background-color: #e02d71;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: opacity .4s linear;
}

.plus-product {
  position: absolute;
  left: 50%;
  bottom: 0;
  font-weight: bold;
  font-size: 22px;
  opacity: 0;
  color: #e02d71;
}

.is-plus-product {
  animation: plus-product 1s ease-in-out;
}

@keyframes plus-product {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: translateY(-160px);
  }
}

.request-error {
  text-align: center;
  position: absolute;
  top: 0;
  z-index: 50;
}
</style>
