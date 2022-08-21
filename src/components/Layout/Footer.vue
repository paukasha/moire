<template>
  <footer class="footer container">
    <div class="footer__wrapper">
      <ul class="footer__links">
        <li v-for="link in footerNav"
            :key="link.id"
        >
          <router-link v-if="link.id === 1"
                       :to="link.href"
                       class="footer__link"
          >
            {{ link.title }}
          </router-link>

          <a class="footer__link"
             v-else-if="link.id === 2 || link.id === 3"
             :class="{'orderInfoError' : requestError }"
             @click="updateRequestError('')"
             :href="link.href"
          >
            {{ link.title }}
          </a>

          <a v-else
             class="footer__link"
             :class="{'orderInfoError' : requestError && link.id === 5 }"
             @click.prevent="openModal(link.id)"
          >
            {{ link.title }}
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
          <router-link class="footer__link"
                       to="/privacy"
                       target="_blank"
                       rel="noopener"
                       type="application/pdf"
          >
            Политика конфиденциальности
          </router-link>
        </li>
        <li>
          <router-link class="footer__link"
                       to="public_offer"
                       target="_blank"
                       rel="noopener"
                       type="application/pdf"
          >
            Публичная оферта
          </router-link>
        </li>
      </ul>

      <span class="footer__copyright">
        © 2022 Moire
      </span>
    </div>

    <ContactsModal v-if="isModalOpen"
                   @close="closeModal($event)"
    >
      <div>
        <div v-if="selectedFooterNav === 4">
          Невероятная распродажа футблок! При покупке двух футболок третья в подарок!
        </div>

        <div v-if="selectedFooterNav === 5">
          <div v-if="isCallSend">Спасибо за заявку! Наши специалисты свяжутся
            с&nbsp;вами в течение 10 минут
          </div>

          <div v-else>
            <ValidationObserver v-slot="{invalid, validate}">
              <form>
                <BaseFieldText title="Телефон"
                               v-mask="'+7 (###)-###-##-##'"
                               v-model="phone"
                               rules="required|min:18"
                               placeholder="Введите ваш телефон"
                />
                <button class="cart__button button button--primery"
                        type="button"
                        @click.prevent="validate().then(sendCall)"
                        :disabled="invalid"
                >
                  Заказать звонок
                </button>
              </form>
            </ValidationObserver>
          </div>
        </div>

        <div v-if="selectedFooterNav === 6">
          <RequestError v-if="requestError"
                        :error="requestError"
          />
          <ValidationObserver v-slot="{invalid, validate}">
            <BaseFieldText title="Номер заказа"
                           v-model="orderId"
                           rules="required|numeric"
                           placeholder="Введите номер заказа"
            />
            <button class="cart__button button button--primery"
                    type="button"
                    :disabled="invalid"
                    @click.prevent="validate().then(showOrderInfo)"
            >
              Получить информацию о заказе
            </button>
          </ValidationObserver>
        </div>
      </div>

    </ContactsModal>
  </footer>
</template>

<script>
import ContactsModal from '@/components/Modal/Modal';
import BaseFieldText from '@/components/Form/BaseFieldText';
import RequestError from '@/components/UI/RequestError';
import { ValidationObserver } from 'vee-validate';
import { mask } from 'vue-the-mask';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { footerNav } from '@/helpers/listsDictionary';

export default {
  components: {
    ContactsModal,
    BaseFieldText,
    ValidationObserver,
    RequestError
  },
  directives: { mask },
  data() {
    return {
      isModalOpen: false,
      isCallSend: false,
      phone: '',
      orderId: '',
      footerNav,
      selectedFooterNav: '',
      isLoading: false,
    };
  },
  mounted() {
    document.addEventListener('click', (event) => this.resetOrderError(event));
  },
  beforeDestroy() {
    document.removeEventListener('click', (event) => this.resetOrderError(event));
  },
  methods: {
    ...mapActions('Order', ['getOrderInfo']),
    ...mapMutations('Order', ['updateRequestError']),
    openModal(val) {
      this.isModalOpen = true;
      this.selectedFooterNav = val;
      this.orderId = '';
      this.updateRequestError('');
    },
    closeModal(e) {
      if (e.target.classList.contains('fixed-overlay') || e.target.closest('.closeBtn')) {
        e.stopPropagation();
        this.isModalOpen = false;
        this.phone = '';
        this.orderId = '';
      }
    },
    sendCall() {
      this.isCallSend = true;
    },
    showOrderInfo() {
      this.isLoading = true;
      this.getOrderInfo(this.orderId)
        .then(res => {
          this.isLoading = false;
          this.isModalOpen = false;

          this.updateRequestError('');

          this.$router.push({
            name: 'OrderInfoPage',
            params: { id: res.data.id }
          })
            .catch(e => {
            });
        })
        .catch(() => {
          this.isLoading = false;
          let error = 'При загрузке информации о заказе произошла ошибка.' + '\n' +
            'Возможно вы ввели неверный номер заказа. ' + '\n' +
            'Уточнить информацию о заказе можно позвонив ' + '\n' +
            'по телефону горячей линии, ' +
            'заказав звонок или отправив письмо на электронную почту. ';
          this.updateRequestError(error);
        });
    },
    resetOrderError(event) {
      let modalContainer = document.querySelector('.fixed-overlay');
      if (!modalContainer) {
        this.updateRequestError('');
      } else if (modalContainer.contains(event.target) || event.target.closest('.closeBtn')) {
        this.closeModal(event);
      }
    }
  },
  computed: {
    ...mapGetters('Order', ['requestError']),
    orderInfoError() {
      return this.$store.state.Order.requestError && this.$route.name == 'OrderInfoPage';
    },
  },
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
