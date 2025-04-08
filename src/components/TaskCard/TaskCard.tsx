import { FC } from "react";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import { Task } from "../../types/types";
import { formatDate, getAssigneeName, getAssigneeInitial } from "../../utils";
import { assignees } from "../../data/columns";
import taskIcon from "../../assets/img/icon-task.svg";
import deleteIcon from "../../assets/img/icon-delete.svg";
import StatusBar from "../StatusBar/StatusBar";
import PriorityBar from "../PriorityBar/PriorityBar";

interface TaskCardProps {
  task: Task;
  handleDeleteTask: (taskName: string) => void;
}

const TaskCard: FC<TaskCardProps> = ({ task, handleDeleteTask }) => {
  const assigneeName = getAssigneeName(task.assigneeId, assignees);
  const assigneeInitials = getAssigneeInitial(assigneeName);

  return (
    <Card id={task.statusId}>
      <CardName>
        <ReactSVG src={taskIcon} style={{ fontSize: "0" }} />
        <span>{task.taskName}</span>
      </CardName>
      <DeleteButton onClick={() => handleDeleteTask(task.taskName)}>
        <ReactSVG src={deleteIcon} />
      </DeleteButton>
      <CardInfo>
        <CardAssignee>
          <CardAssigneeInitial>{assigneeInitials}</CardAssigneeInitial>
          <CardAssigneeName>{assigneeName}</CardAssigneeName>
        </CardAssignee>
        <span>•</span>
        <CardDate>{formatDate(task.dueDate)}</CardDate>
      </CardInfo>
      <CardStatus>
        <PriorityBar priorityId={task.priorityId} />
        <StatusBar statusId={task.statusId} />
      </CardStatus>
      <CardDescription>{task.description}</CardDescription>
    </Card>
  );
};

const Card = styled.article<{ id: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid;
  border-radius: 16px;
  border-color: ${({ id }) => {
    switch (id) {
      case 0:
        return "var(--clr-edgewater)";
      case 1:
        return "var(--clr-spicy-mustard)";
      case 2:
        return "var(--clr-edgewater)";
      case 3:
        return "var(--clr-moon-raker)";
      default:
        return "";
    }
  }};
  background-color: var(--clr-white);
`;

const CardName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  max-width: 252px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: Inter;
  font-size: 12px;
  line-height: 16px;
  color: var(--clr-tundora);
`;

const CardAssignee = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CardAssigneeInitial = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  width: 16px;
  height: 16px;
  border: 1px solid var(--clr-niagara);
  border-radius: 50%;
  font-size: 10px;
  color: var(--clr-niagara);
  background-color: var(--clr-edgewater);
`;

const CardAssigneeName = styled.p`
  color: var(--clr-mine-shaft);
`;

const CardDate = styled.p``;

const CardStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  line-height: 20px;
`;

export default TaskCard;
