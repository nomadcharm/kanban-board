import { Column } from "../types/types";

export const columns: Column[] = [
  { id: 0, title: "В ожидании" },
  { id: 1, title: "В работе" },
  { id: 2, title: "Готово" },
  { id: 3, title: "Тестирование" },
];

export const assignees = [
  { id: 1, name: "Иван Иванов" },
  { id: 2, name: "Мария Смирнова" },
  { id: 3, name: "Дмитрий Алексеев" },
];

export const priorities = [
  { id: 0, title: "Low" },
  { id: 1, title: "Medium" },
  { id: 2, title: "High" },
];

export const statuses = [
  { id: 0, title: "В ожидании" },
  { id: 1, title: "В работе" },
  { id: 2, title: "Готово" },
  { id: 3, title: "Тестирование" },
];
