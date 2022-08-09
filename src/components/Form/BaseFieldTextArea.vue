<template>
  <label class="form__label">
    <BaseFormField :title="title"
                   :error="error"
    >
      <textarea class="form__input form__input--area"
                v-model="dataValue"
                :placeholder="placeholder"
      ></textarea>
    </BaseFormField>
  </label>
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin';

export default {
  mixins: [FormFieldMixin]
};
</script>

<style scoped>

</style>
