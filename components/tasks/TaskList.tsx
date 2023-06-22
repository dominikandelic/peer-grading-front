import { useRouter } from "next/router";
import { Row } from "react-bootstrap";

const TaskList = ({ tasks }) => {
  const router = useRouter();
  if (tasks.length === 0) return <Row>No data</Row>;
  return tasks.map((task) => {
    return (
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
    );
  });
};
export default TaskList;
