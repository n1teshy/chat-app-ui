<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { NButton, NInput, NSpin, useMessage } from "naive-ui";
import { io } from "socket.io-client";
import { useAuthStore } from "../../stores/auth.js";
import dialogApis from "../../api/dialog.js";
import userApis from "../../api/user.js";
import messageApis from "../../api/message.js";

const route = useRoute();
const dialogId = route.params.dialogId;
const auth = useAuthStore();
const socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
  auth: { token: auth.authToken },
});
const message = useMessage();

const isFetchInProgress = ref(false);
const otherGuy = ref(null);
const messages = ref([]);
const messageText = ref(null);
const lastMessagRef = ref(null);

socket.on("message", (message) => {
  messages.value.push(message);
});

async function fetchData() {
  try {
    isFetchInProgress.value = true;
    const dialog = await dialogApis.getDialog(dialogId);
    messages.value = await messageApis.getDialogMessages(dialogId);
    const otherId =
      dialog.from !== auth.currentUser.id ? dialog.from : dialog.to;
    otherGuy.value = await userApis.getUser(otherId);
    setTimeout(() =>
      lastMessagRef.value.scrollIntoView({ behavior: "smooth" }),
    );
  } catch (e) {
    message.error("Something went wrong fam, mind trying later?");
  } finally {
    isFetchInProgress.value = false;
  }
}

function setLastMessageRef(messageIndex, node) {
  if (messageIndex === messages.value.length - 1) {
    lastMessagRef.value = node;
  }
}

async function onSend() {
  try {
    messages.value.push({
      from: auth.currentUser.id,
      content: messageText.value,
    });
    socket.emit("message", {
      to: otherGuy.value.id,
      chat: dialogId,
      content: messageText.value,
    });
    messageText.value = null;
    setTimeout(() =>
      lastMessagRef.value.scrollIntoView({ behavior: "smooth" }),
    );
  } catch (e) {
    message.error(
      "something went wrong while sending message, please try again later",
    );
  }
}

onMounted(fetchData);
</script>
<template>
  <div
    v-if="isFetchInProgress"
    class="text-center"
  >
    <n-spin size="large" />
  </div>
  <div
    v-else-if="otherGuy !== null"
    class="h-screen"
  >
    <div class="sticky top-0 bg-white flex p-2">
      <div class="flex justify-center items-center mr-2">
        <fa-icon
          :icon="['fas', 'user']"
          size="2xl"
        />
      </div>
      <b>{{ otherGuy.name.first }} {{ otherGuy.name.last }}</b>
    </div>
    <div>
      <div
        v-for="(message, messageIndex) in messages"
        class="flex"
        :class="{ 'justify-end': message.from === auth.currentUser.id }"
        :ref="(node) => setLastMessageRef(messageIndex, node)"
      >
        <p class="w-[70%] p-2 rounded-full border my-1">
          {{ message.content }}
        </p>
      </div>
    </div>
    <div class="w-full flex mt-3 fixed bottom-0">
      <div class="w-[90%] md:w-[95%] bg-red-200">
        <n-input
          v-model:value="messageText"
          placeholder=""
          size="large"
        />
      </div>
      <div class="w-[10%] md:w-[5%] flex justify-center items-center">
        <n-button
          @click="onSend"
          :disabled="messageText === null"
          text
        >
          <fa-icon
            :icon="['fas', 'paper-plane']"
            size="lg"
          />
        </n-button>
      </div>
    </div>
  </div>
</template>
