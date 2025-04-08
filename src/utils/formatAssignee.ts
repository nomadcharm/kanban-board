import { Assignee } from "../types/types";

export const getAssigneeName = (id: number, assignees: Assignee[]) => {
  const assignee = assignees.find((assignee) => assignee.id === id);
  return assignee ? assignee.name : "";
};

export const getAssigneeInitial = (name: string) => {
  return name.charAt(0).toUpperCase();
};
