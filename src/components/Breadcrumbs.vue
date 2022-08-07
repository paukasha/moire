<template >
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link to="/" class="breadcrumbs__link" href="index.html"> Каталог </router-link>
    </li>
    <li class="breadcrumbs__item">
      <a class="breadcrumbs__link" @click.prevent="goToMainPage"> {{ cat.title }} </a>
    </li>
    <li class="breadcrumbs__item">
      <a class="breadcrumbs__link"> {{ title }} </a>
    </li>
  </ul>
</template >

<script >
export default {
  props:['category', 'productTitle'],
  data() {
    return {
      cat: '',
      title: ''
    }
  },
  mounted() {
    this.cat = this.category
    this.title = this.productTitle
  },
  methods: {
    goToMainPage() {
      this.$router.push({ name: 'MainPage', query: { categoryId: this.cat.id } })
    }
  }

};
</script >

<style scoped>
.breadcrumbs__item {
  cursor: pointer;
}
</style >
