import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import { TaskResponse } from "../../api/generated";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { statusMapper } from "../../utils/grading/GradingStatusMapperUtil";
import TaskStudentCard from "./TaskStudentCard";

type StudentTaskListProps = {
  tasks: TaskResponse[];
};

const StudentTaskList = ({ tasks }: StudentTaskListProps) => {
  const router = useRouter();
  const { authorizedAxios } = useAuthorizedAxios();
  if (tasks.length === 0) return <Row>No data</Row>;
  // Create an empty Map to store the grouped tasks

  const groupedTasks = tasks.reduce((acc, task) => {
    const courseName = task.course.name;
    acc[courseName] = acc[courseName] || {};
    acc[courseName][task.grading.status] =
      acc[courseName][task.grading.status] || [];
    acc[courseName][task.grading.status].push(task);
    return acc;
  }, {} as Record<string, Record<string, TaskResponse[]>>);

  // Iterate through the map of courses and render them
  return (
    <div>
      {Object.entries(groupedTasks).map(([courseName, tasksByStatus]) => (
        <div className="task-display" key={courseName}>
          <h2>{courseName}</h2>
          {Object.entries(tasksByStatus).map(([status, tasks]) => (
            <Row key={status}>
              <h3>{statusMapper.get(status)}</h3>
              {tasks.map((task: TaskResponse) => {
                return (
                  <Col sm="3">
                    <TaskStudentCard
                      router={router}
                      authorizedAxios={authorizedAxios}
                      task={task}
                    />
                  </Col>
                );
              })}
            </Row>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StudentTaskList;
