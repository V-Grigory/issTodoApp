<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useJobStore } from "@/stores/job";
import { useNotifications } from "@/services/useNotifications";
import { JobFormData, PriorityJob, StatusJob } from "@/types/Job";

const store = useJobStore();
const notifications = useNotifications();

interface Props {
  prefilledFormData: JobFormData;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "savedJob"): void;
  (e: "closedJob"): void;
}>();

const title = computed((): string => {
  return "Редактировать задачу";
});

const form = ref();
const formData = ref<JobFormData>({});

watchEffect(() => {
  props.prefilledFormData.id && (formData.value.id = props.prefilledFormData.id);
  formData.value.title = props.prefilledFormData.title;
  formData.value.description = props.prefilledFormData.description;
  formData.value.status = props.prefilledFormData.status;
  formData.value.priority = props.prefilledFormData.priority;
});

const statuses = computed((): Array<{ title: string, value: string }> => {
  return Object.keys(StatusJob).map((v) => ({ title: StatusJob[v], value: v }));
});

const priorities = computed((): Array<{ title: string, value: string }> => {
  return Object.keys(PriorityJob).map((v) => ({ title: PriorityJob[v], value: v }));
});

const saveJob = async (): void => {
  const { valid } = await form.value.validate();

  if (!valid) {
    return;
  }

  const isEditMode: boolean = !!formData.value.id;

  try {
    if (isEditMode) {
      await store.updateJob(formData.value);
      notifications.success("Задача успешно обновлена");
    } else {
      await store.addJob(formData.value);
      notifications.success("Задача успешно добавлена");
    }
    emit("savedJob");
  } catch (e: any) {
    notifications.error(e.message);
  }
};

const cancel = (): void => {
  emit("closedJob");
};
</script>

<template>
  <v-card :title="title">
    <v-card-text>
      <v-form ref="form" lazy-validation v-on:keydown.enter="saveJob">
        <v-text-field
          v-model="formData.title"
          label="Название"
          variant="outlined"
          :rules="[(v) => !!v || 'Обязательное поле']"
          class="mb-1"
          density="compact"
        />

        <v-text-field
          v-model="formData.description"
          label="Описание"
          variant="outlined"
          class="mb-1"
          density="compact"
        />

        <v-select
          v-model="formData.status"
          label="Статус"
          :items="statuses"
          :rules="[(v) => !!v || 'Обязательное поле']"
          variant="outlined"
          class="mb-1"
          density="compact"
        ></v-select>

        <v-select
          v-model="formData.priority"
          label="Приоритет"
          :items="priorities"
          variant="outlined"
          class="mb-1"
          density="compact"
        ></v-select>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="saveJob" text="Сохранить" variant="tonal"></v-btn>
      <v-btn @click="cancel" text="Отмена" variant="tonal"></v-btn>
    </v-card-actions>
  </v-card>
</template>
