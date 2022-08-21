<template>
  <button class="product__del button-del"
          type="button"
          :aria-label="ariaLabel"
          @click.prevent="$emit('close-modal', $event)"
  >
    <svg width="20"
         height="20"
         fill="currentColor"
    >
      <use xlink:href="#icon-close"></use>
    </svg>
  </button>
</template>

<script>
export default {
  props: ['ariaLabel']
};
</script>

<style scoped>
.button-del {
  cursor: pointer;
}
</style>
