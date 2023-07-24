import { Col, Container, Row } from "react-bootstrap";
import useMyCourses from "../../hooks/useMyCourses";
import CourseList from "../../components/courses/CourseList";
import useStore from "../../hooks/useStore";
import { useAuthStore } from "../../stores/authStore";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import Head from "next/head";
import { ErrorContainer } from "../../components/util/ErrorContainer";
import { LoadingContainer } from "../../components/util/LoadingContainer";

const MyCoursesPage = () => {
  const { courses, isError, isLoading } = useMyCourses();
  const user = useStore(useAuthStore, (store) => store.user);
  const router = useRouter();
  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;
  return (
    <>
      <Head>
        <title>My Courses - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>
              My Courses{" "}
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
        {courses && <CourseList courses={courses} />}
      </Container>
    </>
  );
};

export default MyCoursesPage;
