import { Col, Container, Row } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import Head from "next/head";
import { useRouter } from "next/router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useCourses from "../../hooks/useCourses";
import useUser from "../../hooks/useUser";
import CourseList from "../../components/courses/CourseList";

const CoursesIndexPage = () => {
  useProtectedRoute();
  const { user, isError: isErrorUser, isLoading: isLoadingUser } = useUser();
  const { courses, isError, isLoading } = useCourses();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>All Courses - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>
              All Courses{" "}
              {user && user.is_teacher && (
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
        {(isError || isErrorUser) && <div>Error</div>}
        {(isLoadingUser || isLoading) && <div>Loading</div>}
        {courses && <CourseList courses={courses} />}
      </Container>
    </>
  );
};

export default CoursesIndexPage;
