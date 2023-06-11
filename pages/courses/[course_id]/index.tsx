import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import useCourse from "../../../hooks/useCourse";
import useCourseTasks from "../../../hooks/useCourseTasks";

const CourseDetailPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const { course, isError, isLoading } = useCourse(
    Number(router.query.course_id)
  );
  const {
    tasks,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  } = useCourseTasks(Number(router.query.course_id));
  return (
    <>
      <Head>
        <title>Tasks - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Course Details</h1>
          </Col>
        </Row>
        {isError || (isErrorTask && <div>Error</div>)}
        {isLoading || (isLoadingTask && <div>Loading...</div>)}
        {course && tasks && (
          <>
            <Row>
              <Col>Name: {course.name}</Col>
            </Row>
            <Row>
              <h3>
                Tasks:{" "}
                <AiFillPlusCircle
                  className="plus-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/courses/${course.id}/tasks/add`);
                  }}
                />
              </h3>
            </Row>
            {tasks.map((task) => (
              <Row key={task.id}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/courses/${course.id}/tasks/${task.id}/submissions/add`
                    );
                  }}
                >
                  {task.name}
                </a>
              </Row>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default CourseDetailPage;
