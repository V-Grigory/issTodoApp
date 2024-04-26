export enum StatusJob {
  IN_PROGRES = "В работе",
  DONE = "Выполнена",
}

export enum PriorityJob {
  HIGHT = "Высокий",
  LOW = "Низкий",
}

export type Job = {
  id?: number;
  title: string;
  description: string;
  status: StatusJob;
  priority?: PriorityJob;
};

export type ServiceStorage = {
  getJobs: () => Promise<Job[]>;
}

export type JobCardProps = Pick<Job, "title" | "status">

export type JobFormData = Job | {}
