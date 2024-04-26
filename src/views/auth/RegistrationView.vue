<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  NButton,
  NCard,
  NInput,
  NInputNumber,
  NSelect,
  useMessage,
} from "naive-ui";
import FormItem from "../../components/FormItem.vue";
import FormWrapper from "../../components/FormWrapper.vue";
import authApis from "../../api/auth.js";
import { useAuthStore } from "../../stores/auth.js";
import {
  initFieldErrors,
  setValidationErrors,
  setErrors,
} from "../../utils/validation.js";

const auth = useAuthStore();
const router = useRouter();
const message = useMessage();

const genderOptions = [
  { label: "Male", value: "M" },
  { label: "Female", value: "F" },
];
const formRef = ref(null);
const form = ref({
  username: null,
  password: null,
  firstName: null,
  lastName: null,
  age: null,
  gender: null,
});
const fieldErrors = ref({});
const isSubmitInProgress = ref(false);
initFieldErrors(form.value, fieldErrors.value);
const rules = {
  username: { required: true, message: "Username is required" },
  password: { required: true, message: "Password is required" },
  firstName: { required: true, message: "First name is required" },
  age: { required: true, message: "Age is required" },
  gender: { required: true, message: "Gender is required" },
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
    await authApis.register(form.value);
    await auth.login(form.value.username, form.value.password);
    router.push({ name: "home" });
  } catch (e) {
    if (e.message) {
      message.error(e.message);
      return;
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
          <form-item
            path="firstName"
            :cols="12"
          >
            <n-input
              v-model:value="form.firstName"
              placeholder=""
            />
          </form-item>
          <form-item
            path="lastName"
            :cols="12"
          >
            <n-input
              v-model:value="form.lastName"
              placeholder=""
            />
          </form-item>
          <form-item
            path="age"
            :cols="12"
          >
            <n-input-number
              v-model:value="form.age"
              :show-button="false"
              placeholder=""
            />
          </form-item>
          <form-item
            path="gender"
            :cols="12"
          >
            <n-select
              v-model:value="form.gender"
              :options="genderOptions"
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
