import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DateTime } from "luxon";
import { GradingStatus, TaskResponse, UserResponse } from "../../api/generated";
import { Axios } from "axios";
import { NextRouter, useRouter } from "next/router";
import { toast } from "react-toastify";
import { taskActionMapper } from "../../utils/grading/GradingStatusMapperUtil";
import { TaskActionButtons } from "./TaskActionButtons";

type TaskTeacherCardProps = {
  task: TaskResponse;
  user: UserResponse;
  mutateGrading: () => void;
};

const TaskTeacherCard: React.FC<TaskTeacherCardProps> = ({
  task,
  user,
  mutateGrading,
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
        <TaskActionButtons
          user={user}
          mutateGrading={mutateGrading}
          task={task}
        />
      </Card.Body>
    </Card>
  );
};

export default TaskTeacherCard;
