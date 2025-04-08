export enum TaskStatus {
  Pending = 0,
  InProgress = 1,
  Completed = 2,
  Testing = 3,
}

export enum TaskPriority {
  Low = 0,
  Medium = 1,
  High = 2,
}

export type Task = {
  taskName: string;
  description: string;
  assigneeId: number;
  dueDate: string;
  priorityId: TaskPriority;
  statusId: TaskStatus;
};

export type Column = {
  id: TaskStatus;
  title: string;
};

export type Assignee = {
  id: number;
  name: string;
};
