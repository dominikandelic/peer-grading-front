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
      {(isError || isErrorTask) && <div>Pogreška</div>}
      {(isLoading || isLoadingTask) && <div>Učitavam...</div>}
      {course && tasks && user && (
        <>
          <Row>
            <Col>Naziv: {course.name}</Col>
          </Row>
          <Row>
            <Col>
              Nastavnik: {course.teacher.first_name} {course.teacher.last_name}
            </Col>
          </Row>
          <Row>
            <h3>Zadaci: </h3>
          </Row>
          <StudentTaskList tasks={tasks} />
        </>
      )}
    </>
  );
};

export default StudentCourseContent;
