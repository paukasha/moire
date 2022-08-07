<template >
  <div class="item__desc">
    <ul class="tabs">
      <li class="tabs__item"
          v-for="tab in tabs"
          :key="tab.id"
      >
        <a class="tabs__link"
           @click.prevent="currentTab = tab"
           :class="{'tabs__link--current': currentTab == tab }"
        > {{ tab.title }} </a>
      </li>
    </ul>

    <div class="item__content"
         v-if="currentTab.id == 1"
    >

      <h3>Состав:</h3>
      <span v-for="(material, idx) in productInfo.materials">
        <span v-if="material.title">{{ material.title }}</span>
        <span v-if="idx+1 < productInfo.materials.length">, </span> </span>

      <h3>Коллекция:</h3>
      <span v-for="(season, idx) in productInfo.seasons">
        <span v-if="season.title">{{ season.title }}</span >
        <span v-if="idx+1 < productInfo.seasons.length">, </span> </span>

      <h3>Категория:</h3>
      <span v-if="productInfo.category.title">{{ productInfo.category.title }}</span>

    </div >

    <div class="item__content"
         v-if="currentTab.id == 2"
    >

      <h3 >Доставка:</h3 >

      <div class="delivery"
           v-for="delivery in deliveries"
           :key="delivery.id"
      >
         <span>{{ delivery.title }}
           - <span v-if="delivery.price == 0"> бесплатно</span>
           <span v-else> {{ delivery.price }} руб</span>
           .
         </span>
      </div>

      <h3>Возврат:</h3>

      <span>
        Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br />
        Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в
        которой Вы осуществили покупку. БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br />
        Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по
        телефону 8 800 600 90 09<br />
      </span>

    </div >
  </div >
</template >

<script >
import instance from "@/axiosConfig"
export default {
  props: ['infoProduct'],
  data() {
    return {
      currentTab: '',
      tabs: [{id: 1, title: 'Информация о товаре',content: '' },
        {id: 2, title:  'Доставка и возврат' }],
      deliveries: [],
      payments: [],
      selectedDelivery: '',
      productInfo: ''
    }
  },
  created() {
    this.currentTab = this.tabs[0]
    this.productInfo = this.infoProduct

  },
  mounted() {
    this.getDelivery()
  },
  methods: {
    getDelivery() {
      instance.get('deliveries')
        .then(res => {
          this.deliveries = res.data
        })
    }
  },
  watch: {
    selectedDelivery(val) {
      if (val) {
        instance.get(`payments?deliveryTypeId=${val.id}`)
          .then(res => {
            this.payments = res.data
          })
      }

    }
  }
};
</script>

<style scoped>
.tabs__link {
  cursor: pointer;
}

.delivery {
  display: flex;
  flex-direction: column;
}
</style >
