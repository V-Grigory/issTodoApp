<script setup lang="ts">
import { onMounted } from "vue";
import { useJobStore } from "@/stores/job";
import JobCard from "@/components/widgets/JobCard.vue";

const store = useJobStore();

onMounted(() => store.fetchJobs());
</script>

<template>
  <div
    v-for="(job, index) of store.jobs"
    :key="index"
    class="d-flex align-center"
  >
    <job-card
      :card-fields="job"
      :class="['mb-3', job.priority === 'hight' ? 'bg-green-accent-2' : 'bg-green-accent-1']"
    />
    <i
      @click="editJob()"
      class="mdi mdi-pencil v-icon v-icon--size-large text-green cursor-pointer ml-2"
    />
  </div>

</template>

<style scoped></style>
