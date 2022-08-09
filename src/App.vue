<template>
  <div>
    <Header />
    <main class="content container">
    <router-view />
    </main>
    <Footer />
  </div>


</template>

<script>
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import instance from '@/axiosConfig';

import { mapActions,mapMutations } from 'vuex'

export default {
  data() {
    return {
      userAccessKey:''
    }
  },
  methods: {
    ...mapActions(['getBasket']),
    ...mapMutations(['updateUserAccessKey'])
  },
  mounted() {

    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) {
      this.updateUserAccessKey(userAccessKey)
    }


    this.getBasket()
  },
  components: {
    Header,
    Footer
  },
};
</script>

<style>

</style>
