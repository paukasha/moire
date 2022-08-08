<template>
  <div>

      <div>

        <div class="content__top">
          <div class="content__row">
            <h1 class="content__title">
              Каталог
            </h1 >
            <div class="totalInfo">
              <div>
                  <span class="content__info">
                    Найдено <b >{{ productsCount }}
                </b > {{ productDecline }} </span>
              </div>

              <div>
                <span class="content__info">Показывать по </span>
                <span v-for="length in perPageList"
                      class="perPage"
                      :key="length"
                      @click="perPage = length"
                :class="{'currentPerPage': perPage == length }">{{length}}&nbsp;</span>
              </div>

            </div>

          </div>
        </div>

        <div class="content__catalog">

          <Filters :selected-filter-data.sync="selectedFilterData"
                   @update-data="selectedFilterData = $event"/>


          <section class="catalog">
            <div v-if="isLoading">Загрузка</div>
            <ul v-else class="catalog__list">
              <ProductItem v-for="product in productsList"
                           :key="product.id"
                           :product="product"/>
            </ul>

            <Pagination v-model="currentPage"
                        :pages-count="pagesCount"
                        :current-page="currentPage"
                        :products-count="productsCount"
            />

          </section>
        </div>
      </div>

  </div>

</template>

<script>
import instance from '@/axiosConfig'
import ProductItem from '@/components/ProductItem'
import Pagination from '@/components/Pagination'
import Filters from '@/components/Filters'
import Header from '@/components/Header'
import { createPages } from "@/helpers/pagination";
import wordDecline from "@/helpers/decline";
import { declineProductDict } from "@/helpers/declineWordsDict";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      productsList: [],
      isLoading: false,

      currentPage: 1,
      perPage:  localStorage.getItem('perPage'),
      pagesCount: '',
      productsCount: '',

      perPageList: [3,6,9],


      selectedFilterData: {
        selectedMaxPrice: this.$route.query.maxPrice ? this.$route.query.maxPrice : 0,
        selectedMinPrice: this.$route.query.minPrice ? this.$route.query.minPrice : 0,
        selectedCategory: this.$route.query.categoryId ? this.$route.query.categoryId : 0,
        selectedSeasons: this.$route.query.seasonIds ? [...this.$route.query.seasonIds] : [],
        selectedMaterials: this.$route.query.materialIds ? [...this.$route.query.materialIds] : []
      },


    }
  },
  components: {
    Header,
    ProductItem,
    Pagination,
    Filters
  },

  mounted() {
    this.getProducts()


  },
  computed: {
    productDecline() {
      return wordDecline(this.productsCount, declineProductDict)
    }
  },
  watch: {
    currentPage() {
      this.getProducts()
    },
    selectedFilterData() {
      this.getProducts()
    },
    perPage(val) {
      localStorage.setItem('perPage', val)
      this.currentPage = 1
      this.getProducts()
    }

  },
  methods: {
    ...mapActions(['getBasket']),

    getProducts() {

      this.isLoading = true

        instance.get('products', {
          params: {
            page: this.currentPage,
            limit: this.perPage,
            minPrice: this.selectedFilterData.selectedMinPrice,
            maxPrice: this.selectedFilterData.selectedMaxPrice,
            categoryId: this.selectedFilterData.selectedCategory,
            materialIds: this.selectedFilterData.selectedMaterials ? [...this.selectedFilterData.selectedMaterials] : [],
            seasonIds: this.selectedFilterData.selectedSeasons ? [...this.selectedFilterData.selectedSeasons] : []
          }
        }).then(res => {
          this.isLoading = false
          this.productsList = res.data.items
         return res
        }).then(res => {
          this.productsCount = res.data.pagination.total
          this.pagesCount = res.data.pagination.pages
        })


    }

  }
}
</script>

<style scoped>
.content__row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
}

.totalInfo {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.perPage {
  font-size: 14px;
  cursor: pointer;
}

.currentPerPage {
  font-size: 18px;
  font-weight: bold;
}
</style>
