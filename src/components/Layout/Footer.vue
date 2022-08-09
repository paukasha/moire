<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <router-link :to="{name: 'MainPage', path: '/'}"
                       class="footer__link">
            Каталог
          </router-link>
        </li>
        <li>
          <a class="footer__link"
             href="tel:88006009009">
            8 800 600 90 09
          </a>
        </li>
        <li>
          <a class="footer__link"
             href="mailto:hi@technozavrrr.com">
            hi@technozavrrr.com
          </a>
        </li>
        <li>
          <a class="footer__link"
             href="#">
            Распродажа
          </a>
        </li>
        <li>
<!--          <transition name="orderInfoError" appear> :class="orderInfoError ? 'orderInfoError' : ''"-->
            <a class="footer__link footer__link--medium "

               href="#">
              Заказать звонок
            </a>
<!--          </transition>-->
        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link"
             target="_blank"
             href="https://vk.com/"
             aria-label="Вконтакте">
            <svg width="20"
                 height="11"
                 fill="currentColor">
              <use xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link"
             target="_blank"
             href="https://web-telegram.ru/"
             aria-label="Telegram">
            <svg width="19"
                 height="17"
                 fill="currentColor">
              <use xlink:href="#icon-telegram"></use>
            </svg>
          </a>
        </li>
      </ul>

      <p class="footer__desc">
        Все права на&nbsp;материалы, находящиеся на&nbsp;сайте, охраняются в&nbsp;соответствии с&nbsp;законодательством&nbsp;РФ,
        в&nbsp;том числе об&nbsp;авторском праве и&nbsp;смежных правах.
      </p>

      <ul class="footer__data">
        <li>
          <a class="footer__link"
             href="#"
             target="_blank"
             rel="noopener"
             type="application/pdf">
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link"
             href="#"
             target="_blank"
             rel="noopener"
             type="application/pdf">
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright">
        © 2022 Moire
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      orderInfoError: true
    }

  }
};
</script>

<style >
.orderInfoError-enter-active, .orderInfoError-leave-active {
  opacity: 1;
  transition: opacity 3s;

}
.orderInfoError-enter, .orderInfoError-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
.orderInfoError {
  border: 2px solid #e02d71;
  padding: 6px;
  border-radius: 4px;

}
</style>
