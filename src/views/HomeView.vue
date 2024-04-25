<script setup lang="ts">
import JobsList from "@/components/widgets/JobsList.vue";
import AddJob from "@/components/widgets/AddJob.vue";

import Notification from "@/components/ui/Notification.vue";
</script>

<template>
  <jobs-list />
  <add-job />

  <notification />
</template>
