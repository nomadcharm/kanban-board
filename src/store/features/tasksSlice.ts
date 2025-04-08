import { createSlice } from "@reduxjs/toolkit";
import tasksData from "../../data/data.json";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: tasksData,
  reducers: {},
});

export default tasksSlice.reducer;
