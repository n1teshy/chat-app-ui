<script setup>
import { provide } from "vue";
import { NForm } from "naive-ui";

const props = defineProps({
  nodeRef: { type: [Object, null], required: true },
  model: { type: Object, required: true },
  fieldErrors: { type: Object, required: true },
  rules: { type: Object, default: {} },
  disabled: { type: Boolean, default: false },
  grid: { type: Boolean, default: true },
  size: { type: String, default: "large" },
});
const emit = defineEmits(["update:nodeRef"]);
provide("field-errors", props.fieldErrors);
provide("grid-form", props.grid);
</script>
<template>
  <n-form
    :ref="(node) => emit('update:nodeRef', node)"
    :model="props.model"
    :rules="props.rules"
    :size="props.size"
    :disabled="props.disabled"
  >
    <div :class="{ 'grid grid-cols-12 gap-x-[15px]': props.grid }">
      <slot />
    </div>
  </n-form>
</template>
