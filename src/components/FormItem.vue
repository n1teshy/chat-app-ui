<script setup>
import { inject } from "vue";
import { NFormItem } from "naive-ui";
import { getFieldValue } from "../utils/object";
import { camelCaseToTitleCase } from "../utils/string";

const props = defineProps({
  path: { type: String, required: true },
  cols: { type: Number, default: 4 },
  showLabel: { type: Boolean, default: true },
  showFeedback: { type: Boolean, default: true },
});
const fieldErrors = inject("field-errors");
const isGridForm = inject("grid-form");
</script>
<template>
  <div :style="{ 'grid-column': isGridForm ? `span ${props.cols}` : 'none' }">
    <n-form-item
      :path="props.path"
      :show-label="props.showLabel"
      :label="camelCaseToTitleCase(props.path)"
      :show-feedback="props.showFeedback"
      :feedback="getFieldValue(fieldErrors, props.path).feedback"
      :validation-status="
        getFieldValue(fieldErrors, props.path).validationStatus
      "
      :class="{
        'mb-2': getFieldValue(fieldErrors, props.path).hasError,
      }"
      class="transition-margin duration-150"
    >
      <slot />
    </n-form-item>
  </div>
</template>
