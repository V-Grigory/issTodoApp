<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useJobStore } from "@/stores/job";
import type { Job, JobFormData } from "@/types/Job";
import { StatusJob } from "@/types/Job";
import { useNotifications } from "@/services/useNotifications";

import JobCard from "@/components/widgets/JobCard.vue";
import JobForm from "@/components/widgets/JobForm.vue";

const store = useJobStore();
const notifications = useNotifications();

onMounted(() => getJobs());

const getJobs = async (): void => {
  try {
    await store.fetchJobs();
  } catch (e: any) {
    notifications.error(e.message);
  }
};

const statuses = computed((): Array<{ title: string, value: string }> => {
  return [
    { title: "Показать все задачи", value: "" },
    ...Object.keys(StatusJob).map((v) => ({ title: StatusJob[v], value: v }))
  ];
});

const jobs = computed((): Job[] => {
  return statusFilter.value
    ? store.jobs.filter((job: Job) => job.status === statusFilter.value)
    : store.jobs;
});

const isMultipleDelete = ref<boolean>(false);
const jobIdsForMultipleDelete = ref<number[]>([]);
const statusFilter = ref<string>("");

const isOpenForm = ref<boolean>(false);
let formData: JobFormData = {};

const addJob = (): void => {
  formData = {};
  isOpenForm.value = true;
};

const editJob = (job: JobFormData): void => {
  formData = job;
  isOpenForm.value = true;
};

const deleteJobsByIds = async (jobIds: number[]): void => {
  try {
    await store.deleteJobsByIds(jobIds);
  } catch (e: any) {
    notifications.error(e.message);
  }
};

const onSavedJob = (): void => {
  isOpenForm.value = false;
};

const onClosedJob = (): void => {
  isOpenForm.value = false;
};
</script>

<template>
  <div class="controls d-flex align-center mb-5 pb-3 border-b">
    <v-btn @click="addJob" text="Создать задачу" variant="tonal" />

    <div class="ml-5" style="width: 250px">
      <v-select
        v-model="statusFilter"
        :items="statuses"
        variant="outlined"
        hide-details
        density="compact"
      ></v-select>
    </div>

    <v-switch
      v-model="isMultipleDelete"
      label="Удалить несколько"
      hide-details
      inset
      class="ml-5 mr-5"
    />

    <v-btn
      v-if="isMultipleDelete && jobIdsForMultipleDelete.length"
      @click="deleteJobsByIds(jobIdsForMultipleDelete); jobIdsForMultipleDelete = [];"
      text="Удалить"
      variant="tonal"
    />
  </div>

  <p v-if="!store.jobs?.length">Не создано ни одной задачи</p>

  <div
    v-for="(job, index) of jobs"
    :key="index"
    class="d-flex align-center"
  >
    <job-card
      :card-fields="job"
      :class="['mb-3', job.priority === 'HIGHT' ? 'bg-green-accent-2' : 'bg-green-accent-1']"
    />
    <i
      @click="editJob(job)"
      class="mdi mdi-pencil v-icon v-icon--size-large text-green cursor-pointer ml-2"
    />
    <i
      @click="deleteJobsByIds([job.id])"
      class="mdi mdi-delete-outline v-icon v-icon--size-large text-green cursor-pointer ml-2"
    />
    <v-checkbox
      v-if="isMultipleDelete"
      v-model="jobIdsForMultipleDelete"
      :value="job.id"
      hide-details
      class="ml-2"
    />
  </div>

  <v-dialog v-model="isOpenForm" max-width="500">
    <job-form @saved-job="onSavedJob" @closed-job="onClosedJob" :prefilled-form-data="formData" />
  </v-dialog>
</template>
