<template>
  <li class="catalog__item">
    <router-link
      :to="{ name: 'ProductPage', params: { id: product.id } }"
      class="catalog__pic"
      href="#"
    >
      <img :src="selectedImageSrc || './img/no_image.jpg'" :alt="product.title" />
    </router-link>

    <h3 class="catalog__title">
      <a href="#"> {{ product.title }} </a>
    </h3>

    <span class="catalog__price"> {{ product.price | numberFormat }} ₽ </span>

    <ul class="colors colors--black">
      <li class="colors__item" v-for="color in product.colors">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            v-model="selectedColor"
            type="radio"
            :value="color.color.code"
          />
          <span
            class="colors__value"
            :style="[
              {
                backgroundColor: color.color.code,
                border: color.color.code == '#ffffff' ? '.5px solid #000' : '',
              },
            ]"
          />
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat";
import { changeImageColor } from "@/helpers/changeImageColor";
export default {
  data() {
    return {
      selectedColor: "",
    };
  },
  mounted() {
    console.log(this.product);
    this.selectedColor = this.product.colors[0].color.code;
  },
  computed: {
    selectedImageSrc() {
      if (this.selectedColor) {
        let product = this.product.colors.find((el) => el.color.code === this.selectedColor);
        return changeImageColor(product);
      }
    },
  },

  props: ["product"],
  filters: {
    numberFormat,
  },
};
</script>

<style scoped></style>
