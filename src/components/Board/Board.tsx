import { FC } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import styled from "styled-components";
import Column from "../Column/Column";
import { columns } from "../../data/columns";
import { Task } from "../../types/types";
import { useTasks } from "../../hooks/useTasks";

const Board: FC = () => {
  const boardColumns = [columns[0], columns[1], columns[3], columns[2]];
  const { setStoredTasks, filteredTasks } = useTasks();
  
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["statusId"];

    setStoredTasks((prevTasks: Task[]) =>
      prevTasks.map((task) =>
        task.taskName === taskId
          ? {
              ...task,
              statusId: newStatus,
            }
            : task
          )
        );
      };
      
      return (
    <KanbanBoard>
      <DndContext onDragEnd={handleDragEnd}>
        {boardColumns.map((col) => {
          return <Column key={col.id} column={col} tasks={filteredTasks(col.id)} />;
        })}
      </DndContext>
    </KanbanBoard>
  );
};

const KanbanBoard = styled.div`
  display: flex;
  gap: 16px;
  height: 100%;
`;

export default Board;
