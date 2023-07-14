import { DateTime } from "luxon";
import { Button, ButtonGroup, Card, Row } from "react-bootstrap";
import { TaskResponse } from "../../api/generated";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { FinishGradingButton } from "./grading/FinishGradingButton";
import { StartGradingButton } from "./grading/StartGradingButton";
import { useRouter } from "next/router";
import { statusMapper } from "../../utils/grading/GradingStatusMapperUtil";

type GradingInformationProps = {
  task: TaskResponse;
  mutateGrading: () => void;
};

export const GradingInformation = ({
  task,
  mutateGrading,
}: GradingInformationProps) => {
  const { authorizedAxios } = useAuthorizedAxios();
  const router = useRouter();
  return (
    <Card>
      <Card.Body>
        <Row>
          <span>
            Deadline:{" "}
            <b>
              {DateTime.fromISO(task.grading.deadline).toFormat(
                "dd.LL.yyyy. TT"
              )}
            </b>
          </span>
        </Row>
        <Row>
          <span>Instructions: {task.grading.instructions}</span>
        </Row>
        <Row>
          <span>
            Number of random submissions for students to compare:{" "}
            {task.grading.submissions_number}
          </span>
        </Row>
        <Row>
          <span>Status: {statusMapper.get(task.grading.status)}</span>
        </Row>
        <Row>
          <ButtonGroup size="sm">
            {task.grading.status == "STARTED" ? (
              <FinishGradingButton
                mutateGrading={mutateGrading}
                authorizedAxios={authorizedAxios}
                taskId={task.id}
              />
            ) : task.grading.status == "FINISHED" ? undefined : (
              <StartGradingButton
                mutateGrading={mutateGrading}
                authorizedAxios={authorizedAxios}
                taskId={task.id}
              />
            )}
            <Button
              onClick={(e) => {
                e.preventDefault();
                router.push(`/courses/${task.course.id}/tasks/${task.id}`);
              }}
              variant="warning"
            >
              Edit
            </Button>
          </ButtonGroup>
        </Row>
      </Card.Body>
    </Card>
  );
};
