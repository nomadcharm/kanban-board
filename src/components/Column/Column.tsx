import { FC } from "react";
import { Column as ColumnType } from "../../types/types";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import iconWaiting from "../../assets/img/icon-waiting.svg";
import iconProgress from "../../assets/img/icon-progress.svg";
import iconReady from "../../assets/img/icon-ready.svg";
import iconTesting from "../../assets/img/icon-testing.svg";

interface ColumnProps {
  column: ColumnType;
}

const svgMap: { [key: number]: string } = {
  0: iconWaiting,
  1: iconProgress,
  2: iconReady,
  3: iconTesting,
};

const Column: FC<ColumnProps> = ({ column }) => {
  return (
    <ColumnContainer>
      <ColumnHeader>
        <ColumnTitle id={column.id}>
          <ReactSVG src={svgMap[column.id]} />
          <span>{column.title}</span>
        </ColumnTitle>
        <ColumnTaskCount>0</ColumnTaskCount>
      </ColumnHeader>
      <ColumnBody id={column.id}>
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

const ColumnTitle = styled.div<{ id: number }>`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.5px;
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

const ColumnTaskCount = styled.div`
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

export default Column;
