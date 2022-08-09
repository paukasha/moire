<template>
  <div>
    <span>{{ error }} </span>
    <button class="request-error__btn"
    type="button"
    @click.prevent="$emit('load')">
      Попробовать обновить
    </button>
  </div>
</template>

<script>
export default {
  props: ['error']
};
</script>

<style scoped>
.request-error__btn {
  background: transparent;
  outline: none;
  border: none;
  text-decoration: underline;
  font-size: 20px;
  color: #e02d71;
  cursor: pointer;
}
</style>
