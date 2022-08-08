<template >
  <BaseFormField :title="title" :error="error">
  <input class="form__input"
         v-model="dataValue"
         :type="type"
         :placeholder="placeholder"
  >
  </BaseFormField>
</template >

<script >
import BaseFormField from '@/components/BaseFormField'
import FormFieldMixin from '@/mixins/FormFieldMixin';
export default {
  props: {
      type: {
        default: 'text'
      }
  },

  components: {
    BaseFormField
  },
  mixins: [FormFieldMixin]
};
</script >

<style scoped>

</style >
