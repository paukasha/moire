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
    if (!localStorage.getItem('userAccessKey')) {
      this.getUserAccessKey();
    }

    this.getBasket();
    localStorage.setItem('perPage', '3');

  },
  components: {
    Header,
    Footer
  },
};
</script>

<style>
.content {
  padding-top: 80px !important;
}
</style>
