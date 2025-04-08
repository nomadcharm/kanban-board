import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Task, TaskPriority } from "../../types/types";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import taskIcon from "../../assets/img/icon-task.svg";
import deleteIcon from "../../assets/img/icon-delete.svg";
import StatusBar from "../StatusBar/StatusBar";
import PriorityBar from "../PriorityBar/PriorityBar";
import { useTasks } from "../../hooks/useTasks";

interface AddTaskFormProps {
  columnId: number;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const AddTaskForm: FC<AddTaskFormProps> = ({ columnId, showForm, setShowForm }) => {
  const { handleAddTask } = useTasks();
  const formRef = useRef<HTMLFormElement>(null);
  const { control, setValue, getValues, reset } = useForm<Task>();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | null>(null);
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  const handleOptionClick = (priority: TaskPriority) => {
    setValue("priorityId", priority);
    setSelectedPriority(priority);
    setShowDropdown(false);
  };

  const handleFormSubmit = (data: Task) => {
    const taskData = {
      ...data,
      statusId: columnId,
    };
    handleAddTask(taskData);
    setShowForm((prev) => !prev);
  };

  const handleDelete = () => {
    reset();
    setShowForm((prev) => !prev);
  };

  if (!showForm) return null;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        const formData = getValues();
        handleFormSubmit(formData);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [columnId]);

  return (
    <Form id={columnId} ref={formRef}>
      <StyledWrapper>
        <ReactSVG src={taskIcon} style={{ fontSize: "0" }} />
        <Controller
          name="taskName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => <StyledTaskInput {...field} placeholder="Новая задача" />}
        />
        <DeleteButton onClick={handleDelete} type={"button"}>
          <ReactSVG src={deleteIcon} style={{ fontSize: "0" }} />
        </DeleteButton>
      </StyledWrapper>
      <StatusBar statusId={columnId} />
      {/* добавление исполнителя */}
      {/* <div>
        <Controller
          name="assigneeId"
          control={control}
          defaultValue={0}
          rules={{ required: true }}
          render={({ field }) => <input type="text" {...field} placeholder="Добавить ответственного" />}
        />
      </div> */}
      {/* выбор даты */}
      <div>
        <CalendarButton type="button" onClick={toggleCalendar}>
          {showCalendar ? "" : "Добавить дату"}
        </CalendarButton>

        {showCalendar && (
          <Controller
            name="dueDate"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => <input type="date" {...field} />}
          />
        )}
      </div>

      {/* выбор приоритета */}
      <div style={{ position: "relative", width: "100%" }}>
        <Controller
          name="priorityId"
          control={control}
          defaultValue={TaskPriority.Low}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <StyledInput
                {...field}
                placeholder="Добавить приоритет"
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                value={selectedPriority !== undefined ? "" : field.value}
                readOnly
              />
              {selectedPriority !== undefined ? (
                <PriorityBar priorityId={selectedPriority as TaskPriority} onClick={() => {}} />
              ) : null}
            </>
          )}
        />
        {showDropdown && (
          <Dropdown>
            {Object.entries(TaskPriority)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => (
                <PriorityBar
                  key={key}
                  priorityId={value as TaskPriority}
                  onClick={() => handleOptionClick(value as TaskPriority)}
                />
              ))}
          </Dropdown>
        )}
      </div>
      {/* описание задачи */}
      <div>
        <DescriptionButton type="button" onClick={toggleDescription}>
          {showDescription ? "" : "Добавить описание"}
        </DescriptionButton>

        {showDescription && (
          <>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <textarea {...field} placeholder="Добавить описание" />}
            />
          </>
        )}
      </div>
    </Form>
  );
};

const Form = styled.form<{ id: number }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 16px;
  margin-bottom: 12px;
  padding: 16px;
  width: 100%;
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

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledTaskInput = styled.input`
  border: none;
  outline: none;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  &::placeholder {
    color: var(--clr-gray);
  }
`;

const CalendarButton = styled.button`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: var(--clr-gray);
`;

const Dropdown = styled.ul`
  position: absolute;
  z-index: 1000;
  top: 32px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  width: 100%;
  border: none;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: var(--clr-white);
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  height: 32px;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  &::placeholder {
    color: var(--clr-tundora);
  }
`;

const DescriptionButton = styled.button`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: var(--clr-gray);
`;

export default AddTaskForm;
