<template>
  <label class="colors__label">
      <input
        class="colors__radio sr-only"
       v-model="currentColor"
        type="radio"
        :value="color"
      />
      <span class="colors__value"
            :style="[{backgroundColor: color.code,
                          border: color.code == '#ffffff' ? '.5px solid #000' : '',}]"
      />
    </label>

</template>

<script>
export default {
  props: ['color', 'selectedColor'],
  computed: {
    currentColor: {
      get() {
        return this.selectedColor
      }, set(val) {
        this.$emit('update:selectedColor', val);
      }
    }
  },
};
</script>

<style scoped>

</style>
