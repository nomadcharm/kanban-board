import { FC } from "react";
import { Column as ColumnType, Task } from "../../types/types";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import TaskCard from "../TaskCard/TaskCard";
import StatusBar from "../StatusBar/StatusBar";
import { deleteTask } from "../../store/features/tasksSlice";

interface ColumnProps {
  column: ColumnType;
}

const Column: FC<ColumnProps> = ({ column }) => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const filteredTasks = tasks.filter((task: Task) => task.statusId === column.id);
  const dispatch = useDispatch();

  const handleDeleteTask = (taskName: string) => {
    dispatch(deleteTask({ taskName }));
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
        <button style={{ fontSize: "20px" }}>Новая задача</button>
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
`;

const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export default Column;
