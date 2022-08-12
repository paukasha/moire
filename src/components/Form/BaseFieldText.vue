<template>
  <ValidationProvider v-slot="{errors}"
                      tag="label"
                      class="form__label"
                      :rules="rules"
  >
    <BaseFormField :title="title"
                   :error="errors[0]"
    >
      <input class="form__input"
             v-model="dataValue"
             :type="type"
             :placeholder="placeholder"
      >
    </BaseFormField>
  </ValidationProvider>
</template>

<script>
import BaseFormField from '@/components/Form/BaseFormField';
import FormFieldMixin from '@/mixins/FormFieldMixin';
import { ValidationProvider } from 'vee-validate';

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
</script>

<style scoped>

</style>
