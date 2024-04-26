import type { Job, ServiceStorage } from "@/types/Job";

export const useStorageService = (): ServiceStorage => {
  const getJobs = (): Promise<Job[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const jobs: Job[] | [] = localStorage.getItem("todoJobs")
          ? JSON.parse(localStorage.getItem("todoJobs"))
          : [];

        resolve(jobs);
        // reject(new Error("Error for debug: getJobs"))
      }, 0);
    });
  };

  const saveJobs = (jobs: Job[]): Promise => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem("todoJobs", JSON.stringify(jobs));

        resolve();
        // reject(new Error("Error for debug: saveJobs"))
      }, 0);
    });
  };

  return {
    getJobs,
    saveJobs
  };
};
