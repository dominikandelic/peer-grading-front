import { DateTime } from "luxon";
import { Card, Row } from "react-bootstrap";
import { TaskResponse } from "../../api/generated";

type GradingInformationProps = {
  task: TaskResponse;
};

export const GradingInformation = ({ task }: GradingInformationProps) => {
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
            Number of submissions to compare: {task.grading.submissions_number}
          </span>
        </Row>
        <Row>
          <span>Status: {task.grading.status}</span>
        </Row>
      </Card.Body>
    </Card>
  );
};
