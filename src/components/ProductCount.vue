<template >
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
    @click.prevent="decrementProductCount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text"
           v-model="counter"
           name="count"
           autocomplete="off"/>

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
export default {
  props: ['productCount'],
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
      this.counter = this.counter+1
    },
   decrementProductCount() {
      if (this.counter == 1) return
      this.counter = this.counter-1
    }
  },
  watch: {
    counter(value) {
      this.$emit('update:productCount', value)
    }
  },
};
</script >

<style scoped>
input[name='count'] {
  outline: none;
}
</style >
