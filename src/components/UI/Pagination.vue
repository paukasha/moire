<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        aria-label="Предыдущая страница"
        :class="{ 'pagination__link--disabled': currentPage == 1 }"
        @click.prevent="paginatePrev(currentPage)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="pageNumber in pagesList" :key="pageNumber">
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNumber == currentPage }"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        aria-label="Следующая страница"
        @click.prevent="paginateNext(currentPage)"
        :class="{ 'pagination__link--disabled': currentPage == pagesCount }"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import { createPages } from "@/helpers/pagination";

export default {
  model: {
    props: "currentPage",
    event: "paginate",
  },
  props: ["currentPage", "productsCount", "pagesCount"],
  computed: {
    pagesList: {
      get() {
        return createPages([], this.pagesCount, this.currentPage);
      },
      set(newPagesList) {
        return newPagesList;
      },
    },
  },
  methods: {
    paginate(page) {
      this.$emit("paginate", page);
      this.$router.push({query: {
        page: page
        }})
    },
    paginatePrev(page) {
      if (page == 1) return;
      this.$emit("paginate", +page - 1);
      this.$router.push({query: {
          page: page-1
        }})
    },
    paginateNext(page) {
      if (page == this.pagesCount) return;
      this.$emit("paginate", +page + 1);
      this.$router.push({query: {
          page: page+1
        }})
    },
  },
};
</script>
<style scoped>
.pagination__item:hover {
  cursor: pointer;
}
</style>
