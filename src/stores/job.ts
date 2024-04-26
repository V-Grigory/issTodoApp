import { acceptHMRUpdate, defineStore } from "pinia";

import type { Job } from "@/types/Job";
import { useStorageService } from "@/services/useStorageService";

const storageService = useStorageService();

const getClonedJobs = (jobs: Job[]): Job[] => {
  return jobs.map((job: Job) => ({ ...job }));
};

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
      this._jobs = await storageService.getJobs();
    },

    async addJob(dataJob: Job): void {
      const clonedJobs: Job[] = getClonedJobs(this.jobs);

      clonedJobs.push({
        id: Date.now(),
        ...dataJob
      });

      await storageService.saveJobs(clonedJobs);
      this._jobs = clonedJobs;
    },

    async updateJob(dataJob: Job): void {
      const clonedJobs: Job[] = getClonedJobs(this.jobs);

      const job: Job = clonedJobs.find((job: Job) => job.id === dataJob.id);
      job.title = dataJob.title;
      job.description = dataJob.description;
      job.status = dataJob.status;
      job.priority = dataJob.priority;

      await storageService.saveJobs(clonedJobs);
      this._jobs = clonedJobs;
    },

    async deleteJobsByIds(jobIds: number[]): void {
      let clonedJobs: Job[] = getClonedJobs(this.jobs);

      clonedJobs = clonedJobs.filter((job: Job) => !jobIds.includes(job.id));

      await storageService.saveJobs(clonedJobs);
      this._jobs = clonedJobs;
    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobStore, import.meta.hot));
}
