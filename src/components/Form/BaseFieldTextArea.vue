<template >
  <label class="form__label">
  <BaseFormField :title="title" :error="error">
      <textarea class="form__input form__input--area"
                v-model="dataValue"
                :placeholder="placeholder"></textarea>
  </BaseFormField >
  </label >
</template >

<script >
// import BaseFormField from '@/components/BaseFormField'
import FormFieldMixin from '@/mixins/FormFieldMixin'
export default {
components: {
  // BaseFormField
},
  mixins: [FormFieldMixin]
};
</script >

<style scoped>

</style >
