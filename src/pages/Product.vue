<template>
  <Loader v-if="isLoading"/>
  <RequestError v-else-if="requestError"
                :error="requestError"
                @load="getProductDetail"
  />
  <div v-else>
    <div class="content__top">
      <Breadcrumbs :crumbs="crumbs"
                   @selectedCrumb="goToPage($event)"
      />
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570"
               height="570"
               :src="selectedImageColor.url ? selectedImageColor.url : './img/no_image.jpg'"
               :alt="product.title"
          />
        </div>

        <ul class="pics__list">
          <li class="pics__item"
              v-for="image in filterColorImage"
          >
            <a class="pics__link"
               @click.prevent="selectedImageColor = image"
               :class="{'pics__link--current': selectedImageColor.url == image.url}"
            >
              <img :src="image.url || './img/no_image.jpg'"
                   style="height: 141px"
                   :alt="product.title"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form class="form"
                @submit.prevent="addToBasket"
          >
            <div class="item__row item__row--center">
              <ProductCount :product-count.sync="productCount"
                            @error="error = $event"
              />

              <span v-if="error"
                    class="invalid-counter"
              >{{ error }}</span>
              <b v-else
                 class="item__price"
              > {{ productTotalPrice | numberFormat }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item"
                      v-for="color in filterColorImage"
                      :key="color.id"
                  >
                    <ProductColor v-model="selectedImageColor"
                                  :color="color"
                                  :selected-color.sync="selectedImageColor"
                    />
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select"
                          v-model="selectedSize"
                  >
                    <option v-for="size in product.sizes"
                            :key="size.id"
                            :value="size.id"

                    >
                      {{ size.title }}
                    </option>
                  </select>
                </label>
              </fieldset>
            </div>

            <div v-if="$store.state.Basket.requestError">
              {{ $store.state.Basket.requestError }}
            </div>
            <button v-else
                    class="item__button button button--primery"
                    type="submit"
                    :disabled="error != ''"
            >В корзину
            </button>
          </form>
        </div>
      </div>

      <ProductInfoTabs :product-info="product"/>

    </section>
  </div>
</template>

<script>
import instance from '@/axiosConfig';

import numberFormat from '@/helpers/numberFormat';

import ProductCount from '@/components/UI/ProductCounter';
import ProductInfoTabs from '@/components/ProductInfoTabs';
import ProductColor from '@/components/UI/ProductColor';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Loader from '@/components/UI/Loader/Loader';
import RequestError from '@/components/UI/RequestError';

import { mapActions } from 'vuex';

export default {
  name: 'ProductPage',
  components: {
    ProductCount,
    ProductInfoTabs,
    Breadcrumbs,
    ProductColor,
    Loader,
    RequestError
  },
  data() {
    return {
      product: {},
      filterColorImage: [],
      selectedImageColor: '',
      selectedSize: '',
      productCount: 1,
      isLoading: false,

      error: '',
      requestError: ''
    };
  },

  mounted() {
    this.getProductDetail();
  },
  computed: {
    productTotalPrice() {
      return this.product.price * this.productCount;
    },
    crumbs() {
      return [this.product?.category?.title, this.product.title];
    }
  },

  methods: {
    ...mapActions(['addProductToBasket']),
    goToPage() {
      this.$router.push({
        name: 'MainPage',
        query: { categoryId: this.category.id }
      });
    },
    addToBasket() {
      this.addProductToBasket({
        productId: this.product.id,
        colorId: this.selectedImageColor.id,
        sizeId: this.selectedSize,
        quantity: this.productCount
      });
    },
    getProductDetail() {
      let { id } = this.$route.params;

      this.isLoading = true;

      instance.get(`products/${id}`)
        .then((res) => {
          this.product = res.data;

          this.filterColorImage = res.data.colors.map(el => {
            return {
              id: el.color.id,
              code: el.color.code,
              url: el.gallery ? el.gallery.map(elem => {
                return elem.file.url;
              })
                .join() : ''
            };
          });

          this.selectedImageColor = this.filterColorImage[0];
          this.selectedSize = res.data?.sizes ? res.data?.sizes[0].id : '';

          this.isLoading = false;
        })
        .catch(e => {
          if (e.response.data.error.code == '404') {
            this.$router.push({ name: '404' });
          } else {
            this.requestError = 'При загрузке товара произошла ошибка';
          }
          this.isLoading = false;

        });
    },
  },
  filters: {
    numberFormat,
  },
};
</script>

<style scoped>
.invalid-counter {

  color: red;
  font-size: 20px;
  white-space: nowrap;
  left: -36px;
  bottom: 0;
}

.pics__link img {
  height: 141px;
}
</style>
