import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../hooks/useProtectedRoute";
import useCourse from "../../../../hooks/useCourse";
import { ErrorContainer } from "../../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../../components/util/LoadingContainer";

const TasksIndexPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const { course, isError, isLoading } = useCourse(Number(router.query.id));
  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;
  return (
    <>
      <Head>
        <title>{course.name} - Zadaci - PeerGrader</title>
        <meta name="description" content="PeerGrader meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <h1>
            {course.name} zadaci{" "}
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
