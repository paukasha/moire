<template>
  <div>
    <slot></slot>
    <span class="form__value">{{ title }}</span>
    <span class="form__error"
          v-if="error.length || error != ''"
    >{{ error[0] }}</span>
  </div>
</template>

<script>
export default {
  props: ['title', 'error'],
};
</script>

<style scoped>

</style>
