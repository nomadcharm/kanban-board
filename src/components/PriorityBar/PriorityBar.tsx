import { FC } from "react";
import { TaskPriority } from "../../types/types";
import styled from "styled-components";

interface PriorityBarProps {
  priorityId: TaskPriority;
  onClick?: () => void;
}

const PriorityBar: FC<PriorityBarProps> = ({ priorityId, onClick }) => {
  const priority: { [key in TaskPriority]: string } = {
    [TaskPriority.Low]: "Low",
    [TaskPriority.Medium]: "Medium",
    [TaskPriority.High]: "High",
  };

  return (
    <PriorityTag id={priorityId} onClick={onClick}>
      {priority[priorityId]}
    </PriorityTag>
  );
};

const PriorityTag = styled.div<{ id: number }>`
  padding: 4px 12px;
  height: 24px;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  color: ${({ id }) => {
    switch (id) {
      case 0:
        return "var(--clr-japanese-laurel)";
      case 1:
        return "var(--clr-brown)";
      case 2:
        return "var(--clr-red-berry)";
      default:
        return "";
    }
  }};
  background: ${({ id }) => {
    switch (id) {
      case 0:
        return "var(--clr-snowy-mint)";
      case 1:
        return "var(--clr-milk-punch)";
      case 2:
        return "var(--clr-cosmos)";
      default:
        return "";
    }
  }};
  cursor: pointer;
`;

export default PriorityBar;
