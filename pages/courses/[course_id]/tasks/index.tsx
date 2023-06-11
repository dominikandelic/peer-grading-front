import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../hooks/useProtectedRoute";
import useCourse from "../../../../hooks/useCourse";

const TasksIndexPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const { course, isError, isLoading } = useCourse(Number(router.query.id));
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>{course.name} - Tasks - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <h1>
            {course.name} tasks{" "}
            <AiFillPlusCircle
              className="plus-icon"
              onClick={(e) => {
                e.preventDefault();
                router.push("/tasks/add");
              }}
            />
          </h1>
        </Row>
      </Container>
    </>
  );
};

export default TasksIndexPage;
