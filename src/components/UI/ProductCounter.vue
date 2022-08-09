<template >
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
    @click.prevent="decrementProductCount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <ValidationProvider v-slot="{errors, dirty}"
      rules="integer|positive|required">
    <input type="text"
           v-model.number="counter"
           name="count"
           autocomplete="off"/>
    </ValidationProvider>

    <button type="button"
            aria-label="Добавить один товар"
            @click.prevent="incrementProductCount"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template >

<script >
import { ValidationProvider, extend  } from 'vee-validate';
import { min, digits, integer, required } from 'vee-validate/dist/rules';

export default {
  props: ['productCount'],
  components: {
    ValidationProvider
  },
  data() {
    return {
      counter: ''
    }

  },
  mounted() {
    this.counter = this.productCount
  },
  methods: {
    incrementProductCount() {
      this.counter = +this.counter+1
    },
   decrementProductCount() {
      if (this.counter == 1) return
      this.counter = +this.counter-1
    }
  },
  watch: {
    counter(value) {
      this.$emit('update:productCount', value)
      extend('positive', value => {
        if (value > 0) {
          this.$emit('error', '')
          return true
        }
        this.$emit('error', 'Значение должно быть больше нуля')
      });

      extend('integer', {
        ...integer,
        message: () => {
          this.$emit('error', 'Введите число')
        }
      })

      extend('required', {
        ...required,
        message: () => {
          this.$emit('error', 'Хорош баловаться! Поле является обязательным')
        }
      })
    }
  },
};
</script >

<style scoped>
input[name='count'] {
  outline: none;
}
</style >
