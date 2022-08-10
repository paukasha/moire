<template>
  <div>
    <Header/>
    <main class="content container">
      <router-view/>
    </main>
    <Footer/>
  </div>


</template>

<script>
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      userAccessKey: ''
    };
  },
  methods: {
    ...mapActions(['getBasket', 'getUserAccessKey']),
    ...mapMutations(['updateUserAccessKey'])
  },
  mounted() {
    const userAccessKey = localStorage.getItem('userAccessKey');
    if (!userAccessKey) {
      this.getUserAccessKey();
    }

    localStorage.setItem('perPage', '3');
    this.getBasket();
  },
  components: {
    Header,
    Footer
  },
};
</script>

<style>

</style>
