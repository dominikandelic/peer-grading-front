import { Col, Row } from "react-bootstrap";
import { TaskResponse } from "../../api/generated";
import { statusMapper } from "../../utils/grading/GradingStatusMapperUtil";
import TaskTeacherCard from "./TaskTeacherCard";
import { useAuthStore } from "../../stores/authStore";

type TeacherTaskListProps = {
  tasks: TaskResponse[];
  mutateGrading: () => void;
  isCourseTitleHidden: boolean;
};

const TeacherTaskList = ({
  tasks,
  mutateGrading,
  isCourseTitleHidden,
}: TeacherTaskListProps) => {
  const user = useAuthStore((store) => store.user);

  if (tasks.length === 0) return <Row>Nema podataka za prikaz</Row>;
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
          {!isCourseTitleHidden && <h2>{courseName}</h2>}
          {Object.entries(tasksByStatus).map(([status, tasks]) => (
            <Row key={status}>
              <h3>{statusMapper.get(status)}</h3>
              {tasks.map((task: TaskResponse) => {
                return (
                  <Col sm="3">
                    <TaskTeacherCard
                      task={task}
                      user={user!}
                      mutateGrading={mutateGrading}
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
export default TeacherTaskList;
