<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NButton, NCard, NInput, useMessage } from "naive-ui";
import FormItem from "../../components/FormItem.vue";
import FormWrapper from "../../components/FormWrapper.vue";
import { useAuthStore } from "../../stores/auth.js";
import {
  initFieldErrors,
  setValidationErrors,
  setErrors,
} from "../../utils/validation.js";

const auth = useAuthStore();
const router = useRouter();
const message = useMessage();

const formRef = ref(null);
const form = ref({ username: null, password: null });
const fieldErrors = ref({});
const isSubmitInProgress = ref(false);
initFieldErrors(form.value, fieldErrors.value);
const rules = {
  username: { required: true, message: "Username is required" },
  password: { required: true, message: "Password is required" },
};

async function onSave() {
  try {
    await formRef.value.validate();
  } catch (e) {
    setValidationErrors(form.value, fieldErrors.value, e);
    return;
  }

  try {
    isSubmitInProgress.value = true;
    await auth.login(form.value.username, form.value.password);
    router.push({ name: "home" });
  } catch (e) {
    if (e.message) {
      message.error(e.message);
    }
    setErrors(form.value, fieldErrors.value, e.validation);
  } finally {
    isSubmitInProgress.value = false;
  }
}
</script>
<template>
  <div class="h-screen w-full">
    <div class="grid grid-cols-12">
      <n-card class="md:col-start-5 md:col-span-4 col-span-12">
        <form-wrapper
          v-model:node-ref="formRef"
          :model="form"
          :field-errors="fieldErrors"
          :rules="rules"
          :disabled="isSubmitInProgress"
        >
          <form-item
            path="username"
            :cols="12"
          >
            <n-input
              v-model:value="form.username"
              placeholder=""
            />
          </form-item>
          <form-item
            path="password"
            :cols="12"
          >
            <n-input
              v-model:value="form.password"
              type="password"
              placeholder=""
            />
          </form-item>
        </form-wrapper>
        <div class="text-end">
          <n-button
            @click="onSave"
            :loading="isSubmitInProgress"
            type="primary"
            size="large"
          >
            Save
          </n-button>
        </div>
      </n-card>
    </div>
  </div>
</template>
