<template>
  <div v-if="isLoading">Загрузка</div>
  <div v-else>
    <div class="content__top">
      <Breadcrumbs :category="category"
                    :productTitle="product.title"/>
    </div>


    <section  class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570"
               :src="selectedImageColor.url || './img/no_image.jpg'"
               :alt="product.title" />
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="image in filterColorImage">
            <a class="pics__link"
               @click.prevent="selectedImageColor = image"
              :class="{'pics__link--current': selectedImageColor.url == image.url}">
              <img
                width="98"
                height="98"
                :srcset="image.url"
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
          <form class="form" @submit.prevent="addToBasket">
            <div class="item__row item__row--center">
              <ProductCount :product-count.sync="productCount"/>

              <b class="item__price"> {{ productTotalPrice | numberFormat }} ₽ </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item"
                      v-for="color in filterColorImage"
                      :key="color.id"
                  >
                    <label class="colors__label">
                      <input
                        class="colors__radio sr-only"
                        type="radio"
                        name="color-item"
                        v-model="selectedImageColor"
                        :value="color"
                      />
                      <span class="colors__value"
                            :style="[{backgroundColor: color.colorCode,
                                     border: color.colorCode == '#ffffff' ? '.5px solid #000' : '',
                                      },
                                    ]"
                      > </span >
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" v-model="selectedSize">
                    <option v-for="size in product.sizes"
                            :key="size.id"
                            :value="size.id"

                    >{{ size.title }}</option>

                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery"
                    type="submit"
            >В корзину</button>
          </form>
        </div>
      </div>


        <ProductInfoTabs  :info-product="productInfo" />

    </section>
  </div>
</template>

<script>
import instance from "@/axiosConfig"
import numberFormat from "@/helpers/numberFormat"
import { changeImageColor } from "@/helpers/changeImageColor"
import ProductCount from '@/components/ProductCount'
import ProductInfoTabs from '@/components/ProductInfoTabs'
import Breadcrumbs from '@/components/Breadcrumbs'
import { mapActions } from 'vuex';

export default {
  components: {
    ProductCount,
    ProductInfoTabs,
    Breadcrumbs
  },
  data() {
    return {
      product: {},
      filterColorImage:[],
      selectedImageColor: '',
      selectedSize: '',
      productCount: 1,
      isLoading: false,
      // ошибка нет свойства в консоли
      productInfo: {
        materials: '',
        category: '',
        seasons: ''
      },
      category: []
    };
  },

  mounted() {
    this.getProductDetail();
  },
  computed: {
    productTotalPrice() {
      return this.product.price * this.productCount
    }
  },

  methods: {
...mapActions(['addProductToBasket']),
    addToBasket() {
  this.addProductToBasket({productId: this.product.id, colorId: this.selectedImageColor.id, sizeId: this.selectedSize, quantity: this.productCount })
    },
    getProductDetail() {
      let { id } = this.$route.params;

      this.isLoading = true
      instance.get(`products/${id}`)
        .then((res) => {

        this.product = res.data;



        this.filterColorImage = res.data.colors.map(el => {
            return {
              id: el.color.id,
              colorCode: el.color.code,
              url: el.gallery.map(elem => {
                return elem.file.url
              }).join()
            }
        })
        this.selectedImageColor = this.filterColorImage[0]
          // узнать что тут не так
          this.materials = res.data?.materials
          this.category = res.data?.category

          this.productInfo = {
            materials: res.data?.materials,
            category: res.data?.category,
            seasons: res.data?.seasons

        }

          this.selectedSize = res.data?.sizes ? res.data?.sizes[0].id : ''
          this.isLoading = false
      }).catch(e => {
        this.isLoading = false
        console.log(e)
      });
    },
  },
  filters: {
    numberFormat,
  },
};
</script>

<style scoped></style>
