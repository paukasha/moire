<template>
  <ValidationProvider v-slot="{errors}"
                      tag="label"
                      class="form__label"
                      :rules="rules"
  >

    <BaseFormField :title="title"
                   :error="errors"
    >
      <textarea class="form__input form__input--area"
                v-model="dataValue"
                :placeholder="placeholder"
      ></textarea>
    </BaseFormField>
  </ValidationProvider>
</template>

<script>
import FormFieldMixin from '@/mixins/FormField';
import { ValidationProvider } from 'vee-validate';
import BaseFormField from '@/components/Form/BaseFormField';

export default {
  props: {
    rules: {
      type: [String, Object, Array]
    }
  },
  mixins: [FormFieldMixin],
  components: {
    BaseFormField,
    ValidationProvider
  },
};
</script>

<style scoped>

</style>
