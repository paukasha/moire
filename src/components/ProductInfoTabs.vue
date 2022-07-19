<template >
  <div class="item__desc">
    <ul class="tabs">
      <li class="tabs__item"
      v-for="tab in tabs">
        <a class="tabs__link"
           @click.prevent="currentTab = tab"
           :class="{'tabs__link--current': currentTab === tab }"
        > {{ tab }} </a>
      </li>
    </ul>

    <div class="item__content">
      <h3>Доставка:</h3>

      <p>
        1. Курьерская доставка по Москве и Московской области – 290 ₽<br />
        2.Самовывоз из магазина. Список и адреса магазинов Вы можете посмотреть здесь<br />
      </p>

      <h3>Возврат:</h3>

      <p>
        Любой возврат должен быть осуществлен в течение Возвраты в магазине БЕСПЛАТНО.<br />
        Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в
        которой Вы осуществили покупку. БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.<br />
        Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по
        телефону 8 800 600 90 09<br />
      </p>
    </div>
  </div>
</template >

<script >
export default {
  data() {
    return {
      currentTab: "Информация о товаре",
      tabs: ["Информация о товаре", "Доставка и возврат"]
    }
  }
};
</script >

<style scoped>
.tabs__link {
  cursor: pointer;
}
</style >
