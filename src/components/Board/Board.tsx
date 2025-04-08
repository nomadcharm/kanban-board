import { FC } from "react";
import styled from "styled-components";
import Column from "../Column/Column";
import { columns } from "../../data/columns";

const Board: FC = () => {
  const boardColumns = [columns[0], columns[1], columns[3], columns[2]];

  return (
    <KanbanBoard>
      {boardColumns.map((col) => {
        return <Column key={col.id} column={col} />;
      })}
    </KanbanBoard>
  );
};

const KanbanBoard = styled.div`
  display: flex;
  gap: 16px;
  height: 100%;
`;

export default Board;
