import React from "react";
import Card from "react-bootstrap/Card";
import { DateTime } from "luxon";
import { TaskResponse } from "../../api/generated";
import Link from "next/link";
import { StudentTaskButton } from "./StudentTaskButton";

type TaskStudentCardProps = {
  task: TaskResponse;
};

const TaskStudentCard: React.FC<TaskStudentCardProps> = ({ task }) => {
  return (
    <Card>
      <Card.Body>
        <Link className="link" href={`/tasks/${task.id}`}>
          <Card.Title>{task.name}</Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 text-muted">
          Rok: {DateTime.fromISO(task.deadline).toFormat("dd.LL.yyyy. TT")}
        </Card.Subtitle>
        <Card.Text>
          Kreiran:{" "}
          {DateTime.fromISO(task.created_at).toFormat("dd.LL.yyyy. TT")}
        </Card.Text>
        <StudentTaskButton task={task} />
      </Card.Body>
    </Card>
  );
};

export default TaskStudentCard;
