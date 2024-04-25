import { acceptHMRUpdate, defineStore } from "pinia";

import type { Job } from "@/types/Job";
import { useStorageService } from "@/services/useStorageService";
import { useNotifications } from "@/services/useNotifications";

const storageService = useStorageService();
const notifications = useNotifications();

export const useJobStore = defineStore({
  id: "job",

  state: () => ({
    _jobs: [] as [Job]
  }),

  getters: {
    jobs: (state) => state._jobs
  },

  actions: {
    async fetchJobs(): void {
      try {
        this._jobs = await storageService.getJobs();
      } catch (e: any) {
        notifications.error(e.message);
        console.log("== error ==")
        console.log(e);
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot));
}
