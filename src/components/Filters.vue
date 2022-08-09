<template>
  <aside class="filter">
    <form class="filter__form form"
          @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">
          Цена
        </legend>

        <label class="form__label form__label--price">
          <input class="form__input"
                 type="text"
                 name="min-price"
                 v-model.number="currentFiltersData.selectedMinPrice"
          >
          <span class="form__value">От</span>
        </label>

        <label class="form__label form__label--price">
          <input class="form__input"
                 type="text"
                 name="max-price"
                 v-model.number="currentFiltersData.selectedMaxPrice"
          >
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Категория
        </legend>

        <label class="form__label form__label--select">
          <select class="form__select"
                  v-model.number="currentFiltersData.selectedCategory"
          >
            <option value="0">Все категории</option>
            <option v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Материал
        </legend>

        <ul class="check-list">
          <li class="check-list__item"
              v-for="material in materials"
              :key="material.id"
          >
            <label class="check-list__label">
              <input class="check-list__check sr-only"
                     type="checkbox"
                     name="material"
                     v-model="currentFiltersData.selectedMaterials"
                     :value="material.id"
              >
              <span class="check-list__desc">
                    {{ material.title }}
                    <span v-if="material.productsCount">({{ material.productsCount }})</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Коллекция
        </legend>

        <ul class="check-list">
          <li class="check-list__item"
              v-for="season in seasons"
              :key="season.id"
          >
            <label class="check-list__label">
              <input class="check-list__check sr-only"
                     type="checkbox"
                     name="collection"
                     v-model="currentFiltersData.selectedSeasons"
                     :value="season.id"
              >
              <span class="check-list__desc">
                    {{ season.title }}
                    <span v-if="season.productsCount">({{ season.productsCount }})</span>
                  </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery"
              type="submit"
      >
        Применить
      </button>

      <button class="filter__reset button button--second"
              type="button"
              v-if="isFilterEmpty"
              @click.prevent="reset"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from 'axios';
import instance from '@/axiosConfig';

export default {
  props: ['selectedFilterData'],
  data() {
    return {
      categories: [],
      materials: [],
      seasons: [],

      isFilterEmpty: false,

      currentFiltersData: {
        selectedMaxPrice: this.$route.query.maxPrice,
        selectedMinPrice: this.$route.query.minPrice,
        selectedCategory: this.$route.query.categoryId ? this.$route.query.categoryId : 0,
        selectedSeasons: this.$route.query.seasonIds ? [...this.$route.query.seasonIds] : [],
        selectedMaterials: this.$route.query.materialIds ? [...this.$route.query.materialIds] : []
      },
      fullPath: this.$route.fullPath
    };
  },
  mounted() {
    this.getFilterData();
    this.currentFiltersData = this.selectedFilterData;
  },
  methods: {
    getFilterData() {
      let endpoints = [
        'productCategories',
        'materials',
        'seasons',
      ];

      axios.all(endpoints.map((endpoint) => instance.get(endpoint)))
        .then(
          axios.spread(({ data: productCategories }, { data: materials }, { data: seasons }) => {
            this.categories = productCategories.items;
            this.materials = materials.items;
            this.seasons = seasons.items;
          })
        )
        .catch(e => {
          console.log(e);
        });
    },
    submit() {
      this.$router.push({
        path: '/',
        query: {
          materialIds: this.currentFiltersData.selectedMaterials,
          seasonIds: this.currentFiltersData.selectedSeasons,
          categoryId: this.currentFiltersData.selectedCategory,
          maxPrice: this.currentFiltersData.selectedMaxPrice,
          minPrice: this.currentFiltersData.selectedMinPrice,
        }
      })
        .catch(() => {
        });

      this.$emit('update-data', { ...this.currentFiltersData });
    },
    reset() {
      this.currentFiltersData = {
        selectedMaterials: [],
        selectedSeasons: [],
        selectedCategory: 0,
        selectedMaxPrice: 0,
        selectedMinPrice: 0
      };

      this.$router.push({
        path: '/',
        query: {
          materialIds: this.currentFiltersData.selectedMaterials,
          seasonIds: this.currentFiltersData.selectedSeasons,
          categoryId: this.currentFiltersData.selectedCategory,
          maxPrice: this.currentFiltersData.selectedMaxPrice,
          minPrice: this.currentFiltersData.selectedMinPrice,
        }
      })
        .catch(() => {
        });

      this.$emit('update-data', { ...this.currentFiltersData });
    }
  },
  watch: {
    'currentFiltersData': {
      handler(val) {
        this.isFilterEmpty = Object.values(val)
          .some(el => el != 0 && el != '0' && el.length != 0);
      },
      deep: true
    }
  },
};
</script>

<style scoped>

</style>
