<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li>
          <router-link :to="{name: 'MainPage', path: '/'}"
                       class="footer__link"
          >
            Каталог
          </router-link>
        </li>
        <li>
          <a class="footer__link"
             href="tel:88006009009"
             :class="{'orderInfoError' : orderInfoError }"
          >
            8 800 600 90 09
          </a>
        </li>
        <li>
          <a class="footer__link"
             :class="{'orderInfoError' : orderInfoError }"
             href="mailto:hi@technozavrrr.com"
          >
            hi@technozavrrr.com
          </a>
        </li>
        <li>
          <a class="footer__link"
             @click.prevent="openModal('isSaleOpen')"
          >
            Распродажа
          </a>
        </li>
        <li>
          <a class="footer__link footer__link--medium "
             :class="{'orderInfoError' : orderInfoError }"
             @click.prevent="openModal('isCallOpen')"
          >
            Заказать звонок
          </a>

        </li>
      </ul>

      <ul class="footer__social social">
        <li class="social__item">
          <a class="social__link"
             target="_blank"
             href="https://vk.com/"
             aria-label="Вконтакте"
          >
            <svg width="20"
                 height="11"
                 fill="currentColor"
            >
              <use xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="social__item">
          <a class="social__link"
             target="_blank"
             href="https://web-telegram.ru/"
             aria-label="Telegram"
          >
            <svg width="19"
                 height="17"
                 fill="currentColor"
            >
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
             type="application/pdf"
          >
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a class="footer__link"
             href="#"
             target="_blank"
             rel="noopener"
             type="application/pdf"
          >
            Публичная оферта
          </a>
        </li>
      </ul>

      <span class="footer__copyright">
        © 2022 Moire
      </span>
    </div>

    <ContactsModal v-if="isModalOpen"
                   @close="closeModal"
    >
      <div v-if="isCallOpen">
        <div v-if="isCallSend">Спасибо за заявку! Наши специалисты свяжутся
          с&nbsp;вами в течение 10 минут
        </div>
        <div v-else>

          <ValidationObserver v-slot="{ handleSubmit }">
            <BaseFieldText title="Телефон"
                           v-mask="'+7 (###)-###-##-##'"
                           rules="required|min:18"
                           v-model="phone"
                           placeholder="Введите ваш телефон"
            />
            <button class="cart__button button button--primery"
                    type="button"
                    @click.prevent="handleSubmit(sendCall)"
            >
              Заказать звонок
            </button>
          </ValidationObserver>
        </div>
      </div>

      <div v-if="isSaleOpen">
        Невероятная распродажа футблок! При покупке двух футболок третья в подарок!
      </div>


    </ContactsModal>
  </footer>
</template>

<script>
import ContactsModal from '@/components/Modal/ContactsModal';
import BaseFieldText from '@/components/Form/BaseFieldText';
import { mask } from 'vue-the-mask';
import { extend, validate, ValidationObserver } from 'vee-validate';
import { min, required } from 'vee-validate/dist/rules';

extend('min', {
  ...min,
  message: 'Неверный формат'
});

extend('required', {
  ...required,
  message: 'Это поле обязательно'
});

export default {
  components: {
    ContactsModal,
    BaseFieldText,
    ValidationObserver

  },
  directives: { mask },
  data() {
    return {
      isModalOpen: false,
      isCallSend: false,
      phone: '',
      isCallOpen: false,
      isSaleOpen: false
    };
  },
  methods: {
    openModal(val) {
      this.isModalOpen = true;

      if (val == 'isSaleOpen') {
        this.isSaleOpen = true;
        this.isCallOpen = false;
      }

      if (val == 'isCallOpen') {
        this.isCallOpen = true;
        this.isSaleOpen = false;
      }
    },
    closeModal(e) {
      if (e.target.classList.contains('fixed-overlay')) {
        this.isModalOpen = false;
      }
      this.phone = '';
    },
    sendCall() {
      validate(this.phone, 'min:18')
        .then(result => {
          if (result.valid) {
            this.isCallSend = true;
            setTimeout(() => {
              this.isModalOpen = false;
              this.isCallSend = false;
              this.phone = '';
            }, 5000);
          }
        });
    }
  },
  computed: {
    orderInfoError() {
      return this.$store.state.Order.requestError && this.$route.name == 'OrderInfoPage';
    },
  }
};
</script>

<style>
.footer__link {
  cursor: pointer;
}

.orderInfoError {
  animation: order-error infinite linear 1s;
  padding: 6px;
  border-radius: 4px;
}

@keyframes order-error {
  0% {
    border: 2px solid transparent;
  }
  100% {
    border: 2px solid #e02d71;

  }
}
</style>
