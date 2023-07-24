import { DateTime } from "luxon";
import { Button, ButtonGroup, Card, Row } from "react-bootstrap";
import { TaskResponse, UserResponse } from "../../api/generated";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { FinishGradingButton } from "./grading/FinishGradingButton";
import { StartGradingButton } from "./grading/StartGradingButton";
import { useRouter } from "next/router";
import { statusMapper } from "../../utils/grading/GradingStatusMapperUtil";
import { TaskActionButtons } from "./TaskActionButtons";

type GradingInformationProps = {
  task: TaskResponse;
  mutateGrading: () => void;
  user: UserResponse;
};

export const TaskInformation = ({
  task,
  mutateGrading,
  user,
}: GradingInformationProps) => {
  const { authorizedAxios } = useAuthorizedAxios();
  const router = useRouter();
  return (
    <Card>
      <Card.Body>
        <Row>
          <span>
            Task: <b>{task.name}</b>
          </span>
        </Row>
        <Row>
          <span>
            Created:{" "}
            <b>
              {DateTime.fromISO(task.created_at).toFormat("dd.LL.yyyy. TT")}
            </b>
          </span>
        </Row>
        <Row>
          <span>
            Deadline:{" "}
            <b>{DateTime.fromISO(task.deadline).toFormat("dd.LL.yyyy. TT")}</b>
          </span>
        </Row>
        <Row>
          <span>Instructions: {task.grading.instructions}</span>
        </Row>
        {user.is_teacher && (
          <Row>
            <span>
              Number of random submissions for students to compare:{" "}
              {task.grading.submissions_number}
            </span>
          </Row>
        )}
        <Row>
          <span>Status: {statusMapper.get(task.grading.status)}</span>
        </Row>
        {user.is_teacher && (
          <TaskActionButtons
            user={user}
            mutateGrading={mutateGrading}
            task={task}
          />
        )}
      </Card.Body>
    </Card>
  );
};
