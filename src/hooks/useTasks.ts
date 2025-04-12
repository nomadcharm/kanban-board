import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../store/features/tasksSlice";
import { RootState } from "../store/store";
import { Task } from "../types/types";
import { useLocalStorage } from "./useLocalStorage";

export const useTasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", tasks);

  useEffect(() => {
    const localStorageData = localStorage.getItem("tasks");
    if (localStorageData) {
      setStoredTasks(JSON.parse(localStorageData));
    } else {
      setStoredTasks(tasks);
    }
  }, [tasks]);

  const handleAddTask = (data: Task) => {
    dispatch(addTask(data));
    setStoredTasks((prevTasks: Task[]) => [...prevTasks, data]);
  };

  const handleDeleteTask = (taskName: string) => {
    dispatch(deleteTask({ taskName }));
    const updatedTasks = storedTasks.filter((task) => task.taskName !== taskName);
    setStoredTasks(updatedTasks);
  };

  const filteredTasks = (statusId: number) => {
    return storedTasks.filter((task: Task) => task.statusId === statusId);
  };

  return { tasks, storedTasks, setStoredTasks, handleAddTask, handleDeleteTask, filteredTasks };
};
