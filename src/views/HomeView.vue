<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { NCard, NInput, NList, NListItem, useMessage } from "naive-ui";
import debounce from "debounce";
import dialogApis from "../api/dialog.js";
import usersApis from "../api/user.js";

const message = useMessage();
const router = useRouter();

const username = ref(null);
const isFetchInProgress = ref(false);
const users = ref([]);

async function _updateUsers(username) {
  users.value = (await usersApis.getUsers(username)).data;
}
const updateUsers = debounce(_updateUsers, 400);

async function onChangeUsername(value) {
  try {
    isFetchInProgress.value = true;
    username.value = value;
    await updateUsers(value);
  } catch (e) {
    message.error("Something went wrong fam, mind trying later?");
  } finally {
    isFetchInProgress.value = false;
  }
}

async function onDialogRequest(userId) {
  try {
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
