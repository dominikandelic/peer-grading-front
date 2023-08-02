import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DateTime } from "luxon";
import { GradingStatus, TaskResponse } from "../../api/generated";
import { Axios } from "axios";
import { NextRouter, useRouter } from "next/router";
import { toast } from "react-toastify";
import { taskActionMapper } from "../../utils/grading/GradingStatusMapperUtil";

type TaskStudentCardProps = {
  task: TaskResponse;
  authorizedAxios: Axios;
  router: NextRouter;
};

const TaskStudentCard: React.FC<TaskStudentCardProps> = ({
  task,
  authorizedAxios,
  router,
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{task.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Rok: {DateTime.fromISO(task.deadline).toFormat("dd.LL.yyyy. TT")}
        </Card.Subtitle>
        <Card.Text>
          Kreiran:{" "}
          {DateTime.fromISO(task.created_at).toFormat("dd.LL.yyyy. TT")}
        </Card.Text>
        <Button
          onClick={async (e) => {
            e.preventDefault();
            if (task.grading.status === GradingStatus.STANDBY) {
              const hasSubmittedResponse = await authorizedAxios.get<boolean>(
                `http://127.0.0.1:8000/api/tasks/${task.id}/student/has-submitted`
              );
              const hasAlreadySubmitted = hasSubmittedResponse.data;
              if (hasAlreadySubmitted) {
                router.push(
                  `/courses/${task.course.id}/tasks/${task.id}/submissions/own`
                );
              } else {
                router.push(
                  `/courses/${task.course.id}/tasks/${task.id}/submissions/add`
                );
              }
            } else if (task.grading.status === GradingStatus.STARTED) {
              const hasAlreadyGradedResponse =
                await authorizedAxios.get<boolean>(
                  `http://127.0.0.1:8000/api/grading/${task.id}/has-graded`
                );
              const hasAlreadyGraded = hasAlreadyGradedResponse.data;
              if (hasAlreadyGraded) {
                toast.info(
                  "Već si ocijenio/la radove za ovaj zadatak. Molimo, sačekaj rezultate"
                );
              } else {
                router.push(`/grading/${task.id}`);
              }
            } else {
              router.push(`/grading/result/${task.id}`);
            }
          }}
          variant="primary"
        >
          {taskActionMapper.get(task.grading.status)}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TaskStudentCard;
