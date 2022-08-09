<template>
  <div class="item__desc">
    <ul class="tabs">
      <li class="tabs__item"
          v-for="tab in tabs"
          :key="tab.id"
      >
        <a class="tabs__link"
           @click.prevent="currentTab = tab"
           :class="{'tabs__link--current': currentTab == tab }"
        >
          {{ tab.title }} </a>
      </li>
    </ul>

    <div class="item__content"
         v-if="currentTab.id == 1"
    >
      <h3>Состав:</h3>
      <span v-for="(material, idx) in productInfo.materials">
        <span v-if="material.title">{{ material.title }}</span>
        <span v-if="idx+1 < productInfo.materials.length">, </span>
      </span>

      <h3>Коллекция:</h3>
      <span v-for="(season, idx) in productInfo.seasons">
        <span v-if="season.title">{{ season.title }}</span>
        <span v-if="idx+1 < productInfo.seasons.length">, </span>
      </span>

      <h3>Категория:</h3>
      <span v-if="productInfo.category.title">
        {{ productInfo.category.title }}
      </span>
    </div>

    <div class="item__content"
         v-if="currentTab.id == 2"
    >
      <h3>Доставка:</h3>
      <div class="delivery">
         <span>
           <span>Самовывоз - бесплатно</span>
           <br>
           <span>Курьером - расситывается при оформлении заказа</span>
         </span>
      </div>

      <h3>Возврат:</h3>

      <span>
        Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br/>
        Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в
        которой Вы осуществили покупку. БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br/>
        Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по
        телефону 8 800 600 90 09<br/>
      </span>
    </div>
  </div>
</template>

<script>

export default {
  props: ['infoProduct'],
  data() {
    return {
      currentTab: '',
      tabs: [{
        id: 1,
        title: 'Информация о товаре',
        content: ''
      }, {
        id: 2,
        title: 'Доставка и возврат'
      }],
      productInfo: ''
    };
  },
  created() {
    this.currentTab = this.tabs[0];
    this.productInfo = this.infoProduct;
  },
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

.item__content {
  padding-top: 0;
}
</style>
