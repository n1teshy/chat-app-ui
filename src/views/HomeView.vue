<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { NCard, NInput, useMessage } from "naive-ui";
import debounce from "debounce";
import dialogApis from "../api/dialog.js";
import usersApis from "../api/user.js";

const message = useMessage();
const router = useRouter();

const username = ref(null);
const fetchInProgress = ref(false);
const users = ref([]);

async function _updateUsers(username) {
  users.value = (await usersApis.getUsers(username)).data;
}
const updateUsers = debounce(_updateUsers, 400);

async function onChangeUsername(value) {
  try {
    fetchInProgress.value = true;
    username.value = value;
    await updateUsers(value);
  } catch (e) {
    message.error("Something went wrong fam, mind trying later?");
  } finally {
    fetchInProgress.value = false;
  }
}

async function onDialogRequest(userId) {
  try {
    console.log("getting dialog with ", userId);
    const dialog = await dialogApis.addDialog({ with: userId });
    router.push({ name: "dialog", params: { dialogId: dialog.id } });
  } catch (e) {
    message.error("Something went wrong fam, mind trying later?");
  }
}

onMounted(async () => await _updateUsers(null));
</script>
<template>
  <div class="h-screen w-full p-2">
    <n-card>
      <n-input
        :value="username"
        @update-value="onChangeUsername"
        placeholder=""
        size="large"
      />
      <div class="mt-4">
        <div
          v-for="user in users"
          :key="user.id"
          class="my-1"
        >
          <div
            @click="onDialogRequest(user.id)"
            class="cursor-pointer"
          >
            <b>{{ user.name.first }}</b>
            <p>{{ user.username }}</p>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>
