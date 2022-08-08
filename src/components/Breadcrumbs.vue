<template >
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item">
      <router-link to="/" class="breadcrumbs__link" href="index.html"> Каталог </router-link>
    </li>
    <li class="breadcrumbs__item" v-for="crumb in crumbs">
      <a class="breadcrumbs__link" @click.prevent="selectedCrumb(crumb)"> {{ crumb }} </a>
    </li>
  </ul>
</template >

<script >
export default {
  props:['category', 'productTitle', 'crumbs'],
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
    selectedCrumb(crumb) {
      console.log(crumb);
      this.$emit('selectedCrumb', crumb)
      // this.$router.push({ name: 'MainPage', query: { categoryId: this.cat.id } })
    }
  }

};
</script >

<style scoped>
.breadcrumbs__item {
  cursor: pointer;
}
</style >
