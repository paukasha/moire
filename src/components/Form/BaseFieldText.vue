<template >
  <ValidationProvider v-slot="{errors, dirty}" tag="label" class="form__label"
                      :rules="rules">
  <BaseFormField :title="title" :error="errors[0]">

  <input class="form__input"
         v-model="dataValue"
         :type="type"
         :placeholder="placeholder"
  >

  </BaseFormField>
  </ValidationProvider>
</template >

<script >
import BaseFormField from '@/components/Form/BaseFormField'
import FormFieldMixin from '@/mixins/FormFieldMixin';
import { ValidationProvider,ValidationObserver , extend  } from 'vee-validate';
import { email, digits, integer, required } from 'vee-validate/dist/rules';
export default {
  props: {
      type: {
        default: 'text'
      },
    rules: {
      type: [String, Object],
      default: ''
    },
  },

  components: {
    BaseFormField,
    ValidationProvider
  },
  mixins: [FormFieldMixin]
};
</script >

<style scoped>

</style >
