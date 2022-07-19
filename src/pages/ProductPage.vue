<template>
  <div>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="#"> Носки </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Носки с принтом мороженое </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570"
               :src="selectedImageSrc || './img/no_image.jpg'"
               :alt="product.title" />
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="image in product.colors">
            <a class="pics__link"
               @click.prevent="change(image)"
              :class="{'pics__link--current': src == image.gallery[0].file.url}">
              <img
                width="98"
                height="98"
                :srcset="image.gallery[0].file.url"
                alt="Название товара"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <ProductCount :product-count.sync="productCount"/>

              <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in product.colors">
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        v-model="selectedImageColor"
                        :value="color.color.code"
                        checked=""
                      />
                      <span class="colors__value" :style="{backgroundColor: color.color.code}"> </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select">
                    <option v-for="size in product.sizes"
                            :key="size.id"
                            :value="size.id">{{ size.title }}</option>

                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">В корзину</button>
          </form>
        </div>
      </div>

        <ProductInfoTabs />

    </section>
  </div>
</template>

<script>
import instance from "@/axiosConfig"
import numberFormat from "@/helpers/numberFormat"
import { changeImageColor } from "@/helpers/changeImageColor"
import ProductCount from '@/components/ProductCount'
import ProductInfoTabs from '@/components/ProductInfoTabs'
export default {
  components: {
    ProductCount,
    ProductInfoTabs
  },
  data() {
    return {
      product: "",
      selectedColor: {  },
      src: '',

      productCount: 1,
      selectedImageColor: ''
    };
  },
  mounted() {
    this.getProductDetail();
  },

  computed: {
    selectedImageSrc: {
      get() {
        if (this.selectedColor) {
          return this.src
        }
      },set(newSrc) {
         this.src = newSrc
      }
    }
  },
  watch: {
    selectedColor(value) {
      let image = this.product.colors.find((el) => el.color.code === value);
      this.src = image.gallery[0].file.url
    }
  },
  methods: {
    change(image) {
      this.src = image.gallery[0].file.url;
      this.selectedColor = image.color.code
    },
    getProductDetail() {
      let { id } = this.$route.params;

      instance.get(`products/${id}`).then((res) => {
        this.product = res.data
        this.selectedColor = this.product.colors[0].color.code;
        this.src = this.product.colors[0].gallery[0].file.url

        this.selectedImageColor = {
          color: this.product.colors[0].color.code,
          src: this.product.colors[0].gallery[0].file.url
        }
      });
    },
  },
  filters: {
    numberFormat,
  },
};
</script>

<style scoped></style>
