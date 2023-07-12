import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import useCourse from "../../hooks/useCourse";
import useCourseTasks from "../../hooks/useCourseTasks";
import useUser from "../../hooks/useUser";
import StudentTaskList from "../tasks/StudentTaskList";

type StudentCourseContentProps = {
  user: any;
  courseId: number;
};

const StudentCourseContent = ({
  user,
  courseId,
}: StudentCourseContentProps) => {
  const router = useRouter();
  const { course, isError, isLoading } = useCourse(courseId);
  const {
    tasks,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  } = useCourseTasks(courseId);
  return (
    <>
      {(isError || isErrorTask) && <div>Error</div>}
      {(isLoading || isLoadingTask) && <div>Loading...</div>}
      {course && tasks && user && (
        <>
          <Row>
            <Col>Name: {course.name}</Col>
          </Row>
          <Row>
            <Col>
              Teacher: {course.teacher.first_name} {course.teacher.last_name}
            </Col>
          </Row>
          <Row>
            <h3>Tasks: </h3>
          </Row>
          <StudentTaskList tasks={tasks} />
        </>
      )}
    </>
  );
};

export default StudentCourseContent;
