import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tasksData from "../../data/data.json";
import { Task } from "../../types/types";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksData,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<{ taskName: string }>) => {
      return state.filter((task) => task.taskName !== action.payload.taskName);
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
