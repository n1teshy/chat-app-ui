<script setup>
import { RouterView } from "vue-router";
import { NMessageProvider } from "naive-ui";
</script>
<template>
  <n-message-provider>
    <div class="p-2">
      <router-view />
    </div>
  </n-message-provider>
</template>
