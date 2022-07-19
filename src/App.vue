<template>
  <main class="content container">
    <router-view />
  </main>

</template>

<script>
import MainPage from '@/pages/MainPage';

export default {
  mounted() {
    // console.log('hello')
  },
  components: {
    MainPage,
  },
};
</script>

<style>

</style>
