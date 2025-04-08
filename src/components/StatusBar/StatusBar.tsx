import { FC } from "react";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import iconWaiting from "../../assets/img/icon-waiting.svg";
import iconProgress from "../../assets/img/icon-progress.svg";
import iconReady from "../../assets/img/icon-ready.svg";
import iconTesting from "../../assets/img/icon-testing.svg";
import { TaskStatus } from "../../types/types";

interface StatusBarProps {
  statusId: TaskStatus;
}

const StatusBar: FC<StatusBarProps> = ({ statusId }) => {
  const svgMap: { [key in TaskStatus]: string } = {
    [TaskStatus.Pending]: iconWaiting,
    [TaskStatus.InProgress]: iconProgress,
    [TaskStatus.Completed]: iconReady,
    [TaskStatus.Testing]: iconTesting,
  };

  const titleMap: { [key in TaskStatus]: string } = {
    [TaskStatus.Pending]: "В ожидании",
    [TaskStatus.InProgress]: "В работе",
    [TaskStatus.Completed]: "Готово",
    [TaskStatus.Testing]: "Тестирование",
  };
  return (
    <StatusTag id={statusId}>
      <ReactSVG src={svgMap[statusId]} style={{ fontSize: "0" }} />
      <span>{titleMap[statusId]}</span>
    </StatusTag>
  );
};

const StatusTag = styled.div<{ id: number }>`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 2px 12px;
  height: 24px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -1.4px;
  color: ${({ id }) => {
    switch (id) {
      case 0:
        return "var(--clr-atoll)";
      case 1:
        return "var(--clr-spicy-mustard)";
      case 2:
        return "var(--clr-deep-sapphire)";
      case 3:
        return "var(--clr-windsor)";
      default:
        return "var(--clr-mine-shaft)";
    }
  }};
  background: ${({ id }) => {
    switch (id) {
      case 0:
        return "var(--clr-white-ice)";
      case 1:
        return "var(--clr-cocoanut-cream)";
      case 2:
        return "var(--clr-moon-raker-blue)";
      case 3:
        return "var(--clr-moon-raker)";
      default:
        return "";
    }
  }};
`;

export default StatusBar;
