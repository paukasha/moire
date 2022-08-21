<template>
  <div class="loadError">
    <span>{{ error }}</span>
    <button class="request-error__btn"
            type="button"
            @click.prevent="$emit('load')"
    >
      {{ btnText }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['error', 'btnText']
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

.loadError {
  margin-bottom: 20px;
}

.loadError {
  white-space: pre-line;
}
</style>
