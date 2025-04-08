import { FC, useState } from "react";
import styled from "styled-components";
import { Column as ColumnType, Task } from "../../types/types";
import TaskCard from "../TaskCard/TaskCard";
import StatusBar from "../StatusBar/StatusBar";
import AddButton from "../AddButton/AddButton";
import { useDroppable } from "@dnd-kit/core";
import AddTaskForm from "../AddTaskForm/AddTaskForm";

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

const Column: FC<ColumnProps> = ({ column, tasks }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <ColumnContainer>
      <ColumnHeader>
        <StatusBar statusId={column.id} />
        <ColumnTaskCount>{tasks.length}</ColumnTaskCount>
      </ColumnHeader>
      <ColumnBody id={column.id} ref={setNodeRef}>
        {showForm && <AddTaskForm columnId={column.id} showForm={showForm} setShowForm={setShowForm} />}
        <TaskList>
          {tasks.map((task) => (
            <li key={task.taskName}>
              <TaskCard task={task} />
            </li>
          ))}
        </TaskList>
        <AddButton id={column.id} onClick={handleAddButtonClick} />
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
  // overflow-y: auto;
  // overflow-x: none;
  // &::-webkit-scrollbar {
  //   width: 4px;
  // }

  // &::-webkit-scrollbar-track {
  //   background: transparent;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background-color: #D9DBD7;
  //   border-radius: 10px;
  // }

  // scrollbar-width: thin;
  // scrollbar-color: #D9DBD7 transparent;
`;

const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export default Column;
