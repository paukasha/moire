<template>
  <div>
    <Loader v-if="isLoading"/>

    <div>
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
                              @catch-error="errorCounter = $event"
                />

                <span v-if="errorCounter.errors.length"
                      class="invalid-counter"
                >{{ errorCounter.errors[0] }}</span>
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

              <RequestError v-if="productAddedError"
                            :btn-text="'Сообщить о поступлении'"
                            :error="productAddedError"
                            @load="openModal"
              />
              <div class="invalid invalid-size"
                   v-if="isProductAdded"
              >Товар добавлен в корзину
              </div>

              <button class="item__button button button--primery"
                      type="submit"
              >
                В корзину
              </button>
            </form>
          </div>
        </div>

        <ProductInfoTabs :product-info="product"/>

      </section>
    </div>

    <Modal v-if="isModalOpen"
           @close="closeModal($event)"
    >
      <ValidationObserver v-slot="{invalid, validate, dirty}">
        <div v-if="isReceipt">
          Спасибо за заявку! Как только товар поступит на склад мы сразу сообщим вам!
        </div>
        <div v-else>
            <span class="connect__text">
        Выберите предпочтительный способ связи
      </span>

          <ul class="check-list">
            <li class="check-list__item"
                v-for="connect in connectList"
                :key="connect.id"
            >
              <label class="check-list__label">
                <input class="check-list__check sr-only"
                       type="checkbox"
                       v-model="selectedConnection"
                       :value="connect"
                >
                <span class="check-list__desc">
                    {{ connect.name }}
                  </span>
              </label>
              <BaseFieldText v-model="connect.value"
                             :rules="connect.rules"
                             :placeholder="connect.placeholder"
                             v-mask="connect.id == 2 ? '+7 (###)-###-##-##' : ''"
                             :disabled="!selectedConnection.includes(connect)"
              />
            </li>
          </ul>
          <button class="cart__button button button--primery"
                  type="button"
                  @click.prevent="validate().then(reportReceipt)"
                  :disabled="invalid || !selectedConnection.length || !dirty"
          >
            Сообщить о поступлении
          </button>
        </div>


      </ValidationObserver>
    </Modal>
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
import Modal from '@/components/Modal/Modal';
import BaseFieldText from '@/components/Form/BaseFieldText';
import { ValidationObserver } from 'vee-validate';
import { mapActions, mapGetters } from 'vuex';
import { mask } from 'vue-the-mask';
import { connectList } from '@/helpers/listsDictionary';

export default {
  inject: ['$validator'],
  name: 'ProductPage',
  components: {
    ProductCount,
    ProductInfoTabs,
    Breadcrumbs,
    ProductColor,
    Loader,
    RequestError,
    Modal,
    BaseFieldText,
    ValidationObserver
  },
  directives: {
    mask: {
      bind(el, binding, vnode, oldVnode) {
        if (binding.value) {
          mask(el, binding, vnode, oldVnode);
        }
      }
    },
  },
  data() {
    return {
      product: {},
      filterColorImage: [],
      selectedImageColor: '',
      selectedSize: '',
      productCount: 1,
      isLoading: false,

      errorCounter: { errors: [] },
      isProductAdded: false,
      productAddedError: '',

      isModalOpen: false,
      connectList,
      selectedConnection: [],
      isReceipt: false
    };
  },

  mounted() {
    this.getProductDetail();

  },
  computed: {
    ...mapGetters(['requestErrors']),
    productTotalPrice() {
      return this.product.price * this.productCount;
    },
    crumbs() {
      return [this.product?.category?.title, this.product.title];
    },
  },
  methods: {
    ...mapActions(['addProductToBasket']),
    goToPage() {
      this.$router.push({
        name: 'MainPage',
        query: { categoryId: this.product.category.id }
      });
    },
    addToBasket() {
      this.isLoading = true;
      this.addProductToBasket({
        productId: this.product.id,
        colorId: this.selectedImageColor.id,
        sizeId: this.selectedSize,
        quantity: this.productCount
      })
        .then(() => {
          this.isLoading = false;
          this.isProductAdded = true;
          this.productAddedError = false;
        })
        .catch(e => {
          this.isProductAdded = false;
          this.isLoading = false;
          if (e.response.data.error.request.sizeId) {
            this.productAddedError = 'К сожалению, данного размера нет в наличие';
          } else {
            this.productAddedError = 'При добавлении товара в корзину произошла ошибка. Пожалуйста, обновите страницу ';
          }
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
    openModal() {
      this.isModalOpen = true;
    },
    closeModal(e) {
      if (!e) {
        this.isModalOpen = false;
        this.isReceipt = false;
        return;
      }

      if (e.target.classList.contains('fixed-overlay') || e.target.closest('.closeBtn')) {
        this.isModalOpen = false;
        this.isReceipt = false;
      }
    },
    reportReceipt() {
      this.isReceipt = true;
    }
  },
  filters: {
    numberFormat,
  },
};
</script>

<style scoped>
.invalid-counter {
  max-width: 400px;
  display: inline-block;
  white-space: pre-wrap;
  color: red;
  font-size: 20px;
}

.pics__link img {
  height: 141px;
}

.invalid-size {
  margin-bottom: 10px;
}

.connect__text {
  display: inline-block;
  margin-bottom: 20px;
  font-weight: bold;
}

.check-list__item {
  margin-bottom: 20px;
}
</style>
