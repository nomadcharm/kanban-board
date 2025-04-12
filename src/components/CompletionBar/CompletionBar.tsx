import { FC } from "react";
import styled from "styled-components";

interface CompletionBarProps {
  percentage: number;
}

const CompletionBar: FC<CompletionBarProps> = ({ percentage }) => {
  return (
    <BarWrapper>
      <StyledText>
        <span>{percentage} % </span>
        <span>выполненных задач</span>
      </StyledText>
      <StyledCompletionBar>
        <CompletionPercentage percent={percentage} />
      </StyledCompletionBar>
    </BarWrapper>
  )
}

const BarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  max-height: 20px;
`;

const StyledText = styled.p`
  flex-shrink: 0;
  font-size: 17.5px;

  & > span:nth-child(1) {
    font-weight: 700;
    color: var(--clr-cornflower-blue);
  }

    & > span:nth-child(2) {
    color: var(--clr-black);
  }
`;

const StyledCompletionBar = styled.div`
  width: 100%;
  height: 12px;
  border-radius: 9999px;
  background-color: var(--clr-porcelain);
  overflow: hidden;
`;

const CompletionPercentage = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  border-radius: 9999px;
  background-color: var(--clr-cornflower-blue);
`;

export default CompletionBar
