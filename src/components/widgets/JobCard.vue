<script setup lang="ts">
import { JobCardProps } from "@/types/Job";
import { StatusJob } from "@/types/Job";

interface Props {
  cardFields: JobCardProps;
}

defineProps<Props>();
</script>

<template>
  <v-card width="300">
    <template v-slot:title>
      {{ cardFields.title }}
    </template>

    <template v-slot:subtitle>
      {{ StatusJob[cardFields.status] }}
    </template>
  </v-card>
</template>
