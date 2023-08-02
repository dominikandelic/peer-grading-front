import { Col, Container, Row } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import Head from "next/head";
import { useRouter } from "next/router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useCourses from "../../hooks/useCourses";
import useUser from "../../hooks/useUser";
import CourseList from "../../components/courses/CourseList";
import { ErrorContainer } from "../../components/util/ErrorContainer";
import { LoadingContainer } from "../../components/util/LoadingContainer";

const CoursesIndexPage = () => {
  useProtectedRoute();
  const { user, isError: isErrorUser, isLoading: isLoadingUser } = useUser();
  const { courses, isError, isLoading } = useCourses();
  const router = useRouter();
  if (isError || isErrorUser) {
    return <ErrorContainer />;
  }
  if (isLoadingUser || isLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <Head>
        <title>Svi kolegiji - PeerGrader</title>
        <meta name="description" content="PeerGrader meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>
              Svi kolegiji{" "}
              {user && (user.is_teacher || user.is_superuser) && (
                <AiFillPlusCircle
                  className="plus-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/courses/add");
                  }}
                />
              )}
            </h1>
          </Col>
        </Row>
        {courses && <CourseList courses={courses} />}
      </Container>
    </>
  );
};

export default CoursesIndexPage;
