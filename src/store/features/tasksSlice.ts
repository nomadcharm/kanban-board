import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tasksData from "../../data/data.json";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksData,
  reducers: {
    deleteTask: (state, action: PayloadAction<{ taskName: string }>) => {
      return state.filter((task) => task.taskName !== action.payload.taskName);
    },
  },
});

export const { deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
