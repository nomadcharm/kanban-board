import { FC } from "react";
import styled from "styled-components";

interface AddButtonProps {
  id: number;
  onClick: () => void;
}

const AddButton: FC<AddButtonProps> = ({ id, onClick }) => {
  return (
    <AddTaskButton id={id} onClick={onClick}>
      <span> + </span>
      <span>Новая задача</span>
    </AddTaskButton>
  );
};

const AddTaskButton = styled.button<{ id: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 14px;
  width: 100%;
  border: 1px solid;
  border-radius: 12px;
  border-color: ${({ id }) => {
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
        return "";
    }
  }};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
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
        return "";
    }
  }};
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;

  span:first-child {
    font-size: 24px;
  }

  &:focus,
  &:hover {
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
  }
`;

export default AddButton;
