import { useRouter } from "next/router";
import { Row } from "react-bootstrap";
import { TaskResponse } from "../../api/generated";

type StudentTaskListProps = {
  tasks: TaskResponse[];
};

const StudentTaskList = ({ tasks }: StudentTaskListProps) => {
  const router = useRouter();
  if (tasks.length === 0) return <Row>No data</Row>;
  return tasks.map((task) => {
    return (
      <Row key={task.id}>
        <a
          href="#"
          className="link-dark d-block"
          onClick={(e) => {
            e.preventDefault();
            router.push(
              `/courses/${task.course.id}/tasks/${task.id}/submissions/add`
            );
          }}
          key={task.id}
        >
          {task.name}
        </a>
      </Row>
    );
  });
};
export default StudentTaskList;
