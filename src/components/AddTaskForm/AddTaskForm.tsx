import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Assignee, Task, TaskPriority } from "../../types/types";
import styled from "styled-components";
import { ReactSVG } from "react-svg";
import { assignees } from "../../data/columns";
import assigneeIcon from "../../assets/img/icon-form-assignee.svg";
import priorityIcon from "../../assets/img/icon-form-priority.svg";
import calendarIcon from "../../assets/img/icon-form-calendar.svg";
import formTaskIcon from "../../assets/img/icon-form-task.svg";
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
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState<boolean>(false);
  const [selectedAssignee, setSelectedAssignee] = useState<Assignee | null>(null);
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

  const handleAssigneeOptionCLick = (assignee: Assignee) => {
    setValue("assigneeId", assignee.id);
    setSelectedAssignee(assignee);
    setShowAssigneeDropdown(false);
  }

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
      <StyledTaskWrapper>
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
      </StyledTaskWrapper>
      {/* статус */}
      <div style={{ marginBottom: "16px" }}>
        <StatusBar statusId={columnId} />
      </div>
      {/* добавление исполнителя */}
      <AssigneeWrapper>
        <Controller
          name="assigneeId"
          control={control}
          defaultValue={assignees[0].id}
          rules={{ required: true }}
          render={({ field }) => (
            <AssigneeButtonWrapper>
              <ReactSVG src={assigneeIcon} style={{ fontSize: "0" }} />
              <AssigneeButton
                {...field}
                placeholder="Добавить исполнителя"
                onFocus={() => setShowAssigneeDropdown(true)}
                onBlur={() => setTimeout(() => setShowAssigneeDropdown(false), 200)}
                value={selectedAssignee ? selectedAssignee.name : ""}
                readOnly
              />
            </AssigneeButtonWrapper>
          )}
        />
        {showAssigneeDropdown && (
          <AssigneeDropdown>
            <AssigneeOptionsWrapper>
              <DropdownTitle>Выберите исполнителя</DropdownTitle>
              {assignees.map((assignee) => (
                <AssigneeBar
                  key={assignee.id}
                  onClick={() => handleAssigneeOptionCLick(assignee)}
                >
                  {assignee.name}
                </AssigneeBar>
              ))}
            </AssigneeOptionsWrapper>
          </AssigneeDropdown>
        )}
      </AssigneeWrapper>
      {/* выбор даты */}
      <>
        <CalendarButtonWrapper>
          <ReactSVG src={calendarIcon} style={{ fontSize: "0" }} />
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
        </CalendarButtonWrapper>
      </>

      {/* выбор приоритета */}
      <PriorityWrapper>
        <Controller
          name="priorityId"
          control={control}
          defaultValue={TaskPriority.Low}
          rules={{ required: true }}
          render={({ field }) => (
            <PriorityButtonWrapper>
              <ReactSVG src={priorityIcon} style={{ fontSize: "0" }} />
              <PriorityButton
                {...field}
                placeholder="Добавить приоритет"
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                value={selectedPriority !== undefined ? "" : field.value}
                readOnly
              />
              {selectedPriority !== undefined ? (
                <PriorityBar priorityId={selectedPriority as TaskPriority} onClick={() => { }} />
              ) : null}
            </PriorityButtonWrapper>
          )}
        />
        {showDropdown && (
          <Dropdown>
            <OptionsWrapper>
              <DropdownTitle>Выберите приоритет</DropdownTitle>
              {Object.entries(TaskPriority)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                  <PriorityBar
                    key={key}
                    priorityId={value as TaskPriority}
                    onClick={() => handleOptionClick(value as TaskPriority)}
                  />
                ))}
            </OptionsWrapper>
          </Dropdown>
        )}
      </PriorityWrapper>

      {/* описание задачи */}
      <DescriptionWrapper>
        <DescriptionButton type="button" onClick={toggleDescription}>
          <ReactSVG src={formTaskIcon} style={{ fontSize: "0" }} />
          <span>Добавить описание</span>
        </DescriptionButton>

        {showDescription && (
          <>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <StyledTextArea {...field} placeholder="Некоторое описание задачи" />}
            />
          </>
        )}
      </DescriptionWrapper>
    </Form >
  );
};

const Form = styled.form<{ id: number }>`
  display: flex;
  flex-direction: column;
  align-items: start;
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

const StyledTaskWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
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

const CalendarButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
`;

const CalendarButton = styled.button`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: var(--clr-tundora);
`;

const PriorityWrapper = styled.div`
  position: relative;
  padding: 4px 8px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  `;

const PriorityButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dropdown = styled.div`
  position: absolute;
  z-index: 1000;
  top: 40px;
  left: 0;
  right: 0;
  max-height: 32px;
`;

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  background: var(--clr-white);
`;

const DropdownTitle = styled.p`
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 12px;
`;

const PriorityButton = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  cursor: pointer;
  &::placeholder {
    color: var(--clr-tundora);
  }
`;

const DescriptionWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const DescriptionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  width: 100%;
  font-weight: 500;
  font-size: 12px;
  color: var(--clr-tundora);
`;

const StyledTextArea = styled.textarea`
  position: absolute;
  z-index: 1000;
  padding: 16px;
  width: 100%;
  max-width: 280px;
  height: 52px;
  resize: none;
  border: none;
  outline: none;
  border-radius: 12px;
  font-weight: 400;
  font-size: 14px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  &::placeholder {
    color: var(--clr-tundora)
  }
`;

const AssigneeWrapper = styled.div`
  width: 100%; 
`;

const AssigneeButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
`;

const AssigneeDropdown = styled.div`
  width: 100%;
`;

const AssigneeOptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  width: 100%;
  border: none;
  border-radius: 12px;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  background: var(--clr-white);
  cursor: pointer;
`;

const AssigneeButton = styled.input`
  width: 100%;
  font-weight: 500;
  font-size: 12px;
  color: var(--clr-tundora);
  cursor: pointer;
  &::placeholder {
    color: var(--clr-tundora);
  }
`;

const AssigneeBar = styled.div``;

export default AddTaskForm;
