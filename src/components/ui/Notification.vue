<template>
  <v-snackbar v-model="store._isShow" :timeout="showTime" :color="store._color" location="bottom right">
    <div v-for="(text, index) in store._text.split('\n')" :key="index">
      {{ text }}
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotificationStore } from "@/stores/notification";

const store = useNotificationStore();

const showTime = 5000;
</script>
