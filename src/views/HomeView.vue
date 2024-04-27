<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { NCard, NInput, NList, NListItem, NSpin, useMessage } from "naive-ui";
import debounce from "debounce";
import dialogApis from "../api/dialog.js";
import usersApis from "../api/user.js";

const message = useMessage();
const router = useRouter();

const username = ref(null);
const isFetchInProgress = ref(false);
const users = ref([]);
let peers = [];

async function _updateUsers(username) {
  users.value = (await usersApis.getUsers(username)).data;
}
const updateUsers = debounce(_updateUsers, 400);

async function onChangeUsername(value) {
  username.value = value;
  if (!value) {
    users.value = peers;
    return;
  }
  try {
    isFetchInProgress.value = true;
    await updateUsers(value);
  } catch (e) {
    message.error(e.message);
  } finally {
    isFetchInProgress.value = false;
  }
}

async function onDialogRequest(userId) {
  try {
    const dialog = await dialogApis.addDialog({ with: userId });
    router.push({ name: "dialog", params: { dialogId: dialog.id } });
  } catch (e) {
    message.error(e.message);
  }
}

async function fetchData() {
  try {
    isFetchInProgress.value = true;
    peers = await dialogApis.getPeers();
    users.value = peers;
  } catch (e) {
    message.error(e.message);
  } finally {
    isFetchInProgress.value = false;
  }
}

onMounted(fetchData);
</script>
<template>
  <div
    v-if="isFetchInProgress && users.length === 0"
    class="text-center"
  >
    <n-spin size="large" />
  </div>

  <div
    v-else
    class="h-screen w-full p-2"
  >
    <n-card>
      <n-input
        :value="username"
        @update-value="onChangeUsername"
        :loading="isFetchInProgress"
        placeholder=""
        size="large"
      />
      <n-list
        hoverable
        clickable
      >
        <n-list-item
          v-for="user in users"
          @click="onDialogRequest(user.id)"
          class="my-1"
        >
          <div class="flex">
            <div class="flex justify-center items-center pr-2">
              <fa-icon
                :icon="['fas', 'user']"
                size="2xl"
              />
            </div>
            <div>
              <b>{{ user.name.first }}</b>
              <p>{{ user.username }}</p>
            </div>
          </div>
        </n-list-item>
      </n-list>
    </n-card>
  </div>
</template>
