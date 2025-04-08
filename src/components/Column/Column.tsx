import { FC, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Column as ColumnType, Task } from "../../types/types";
import { RootState } from "../../store/store";
import TaskCard from "../TaskCard/TaskCard";
import StatusBar from "../StatusBar/StatusBar";
import { deleteTask } from "../../store/features/tasksSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import AddButton from "../AddButton/AddButton";

interface ColumnProps {
  column: ColumnType;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", tasks);
  const filteredTasks = storedTasks.filter((task: Task) => task.statusId === column.id);

  useEffect(() => {
    const localStorageData = localStorage.getItem("tasks");
    if (!localStorageData) {
      setStoredTasks(tasks);
    }
  }, [tasks]);

  const handleDeleteTask = (taskName: string) => {
    dispatch(deleteTask({ taskName }));
    const updatedTasks = storedTasks.filter((task) => task.taskName !== taskName);
    setStoredTasks(updatedTasks);
  };

  return (
    <ColumnContainer>
      <ColumnHeader>
        <StatusBar statusId={column.id} />
        <ColumnTaskCount>{filteredTasks.length}</ColumnTaskCount>
      </ColumnHeader>
      <ColumnBody id={column.id}>
        <TaskList>
          {filteredTasks.map((task) => (
            <li key={task.taskName}>
              <TaskCard task={task} handleDeleteTask={() => handleDeleteTask(task.taskName)} />
            </li>
          ))}
        </TaskList>
        <AddButton id={column.id} />
      </ColumnBody>
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: calc((100% - 48px) / 4);
  height: 100%;
`;

const ColumnHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ColumnTaskCount = styled.div`
  font-size: 14px;
  color: var(--clr-dove-gray);
`;

const ColumnBody = styled.div<{ id: number }>`
  position: relative;
  padding: 12px;
  height: 100%;
  border-radius: 20px;
  background: ${({ id }) => {
    switch (id) {
      case 0:
        return "var(--clr-catskill-white)";
      case 1:
        return "var(--clr-spring-wood)";
      case 2:
        return "var(--clr-pale-white)";
      case 3:
        return "var(--clr-whisper)";
      default:
        return "";
    }
  }};
  overflow-y: auto;
    &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #D9DBD7;
    border-radius: 10px;
  }
  
  scrollbar-width: thin;
  scrollbar-color: #D9DBD7 transparent;
`;

const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export default Column;
