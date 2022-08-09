<template>
  <li class="catalog__item">
    <router-link
      :to="{ name: 'ProductPage', params: { id: product.id } }"
      class="catalog__pic"
      href="#"
    >
      <img :src="selectedImageSrc || './img/no_image.jpg'"
           :alt="product.title"/>
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price">
      {{ product.price | numberFormat }} ₽
    </span>

    <ul class="colors colors--black" >
      <li class="colors__item" v-for="color in product.colors"  :key="color.id">
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

export default {
  props: ['product'],
  components: {
    ProductColor
  },
  methods: {
    show(ev) {
      console.log(ev)
    }
  },
  data() {
    return {
      selectedColor: '',
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

<style scoped></style>
