<template>
  <div>
    <slot></slot>
    <span class="form__value">{{ title }}</span>
    <span class="form__error">{{ error }}</span>
  </div>
</template>

<script>
export default {
  props: ['title', 'error']

};
</script>

<style scoped>

</style>
