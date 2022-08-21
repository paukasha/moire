<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link to="/"
                   class="breadcrumbs__link"
                   href="index.html"
      >
        Каталог
      </router-link>
    </li>
    <li class="breadcrumbs__item"
        v-for="crumb in crumbs"
    >
      <a class="breadcrumbs__link"
         @click.prevent="selectedCrumb(crumb)"
      >
        {{ crumb }}
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['crumbs'],
  methods: {
    selectedCrumb(crumb) {
      this.$emit('selectedCrumb', crumb);
    }
  }
};
</script>

<style scoped>
.breadcrumbs__item:not(:last-child) {
  cursor: pointer;
}
</style>
