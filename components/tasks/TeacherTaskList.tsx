import { useRouter } from "next/router";
import { Row } from "react-bootstrap";
import { TaskResponse } from "../../api/generated";

type TeacherTaskListProps = {
  tasks: TaskResponse[];
};

const TeacherTaskList = ({ tasks }: TeacherTaskListProps) => {
  const router = useRouter();
  if (tasks.length === 0) return <Row>No data</Row>;
  return tasks.map((task) => (
    <Row key={task.id}>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          router.push(
            `/courses/${task.course.id}/tasks/${task.id}/submissions`
          );
        }}
      >
        {task.name}
      </a>
    </Row>
  ));
};
export default TeacherTaskList;
