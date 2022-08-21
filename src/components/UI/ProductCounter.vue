<template>
  <div class="form__counter">
    <button type="button"
            aria-label="Убрать один товар"
            @click.prevent="decrementProductCount"
    >
      <svg width="12"
           height="12"
           fill="currentColor"
      >
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <ValidationProvider rules="required|min_value:1"
                        v-slot="{ errors, invalid, validate, dirty }"
                        :vid="id"
    >
      <input type="text"
             v-model.number="counter"
             autocomplete="off"
             :name="'count'"
             @input="sendError(validate($event))"
      />
    </ValidationProvider>

    <button type="button"
            aria-label="Добавить один товар"
            @click.prevent="incrementProductCount"
    >
      <svg width="12"
           height="12"
           fill="currentColor"
      >
        <use xlink:href="#icon-plus"></use>
      </svg>

    </button>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {

  props: ['productCount', 'id'],
  components: {
    ValidationProvider
  },
  data() {
    return {
      counter: '',
      dict: {
        ru: {
          messages: {
            required: () => 'Поле является обязательным',
            min_value: () => 'Значение должно быть целым положительным числом и больше нуля',
          }
        }
      }
    };
  },
  mounted() {
    this.counter = this.productCount;

  },
  methods: {
    sendError(er) {
      er.then(res => {
        this.$emit('catch-error', res);
      });
    },
    incrementProductCount() {
      this.counter = +this.counter + 1;
    },
    decrementProductCount() {
      if (this.counter == 1) return;
      this.counter = +this.counter - 1;
    }
  },
  watch: {
    counter(value) {
      this.$emit('update:productCount', value);
    }
  },
};
</script>
<style scoped>

input[name='count'] {
  outline: none;
}
</style>
