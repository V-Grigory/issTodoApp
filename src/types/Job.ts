export enum StatusJob {
  IN_PROGRES = "В работе",
  DONE = "Выполнена",
}

export enum PriorityJob {
  HIGHT = "hight",
  LOW = "low",
}

export type Job = {
  title: string;
  description: string;
  status: StatusJob;
  priority?: PriorityJob;
};

export type ServiceStorage = {
  getJobs: () => Promise<Job[]>;
}

export type JobCardProps = Pick<Job, "title" | "status">
