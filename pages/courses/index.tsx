import { Col, Container, Row } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import Head from "next/head";
import { useRouter } from "next/router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useCourses from "../../hooks/useCourses";
import { useMemo } from "react";

const CoursesIndexPage = () => {
  useProtectedRoute();
  const { courses, isError, isLoading } = useCourses();
  const router = useRouter();

  const CourseList = useMemo(() => {
    if (courses) {
      return courses.map((course) => {
        return (
          <a
            href="#"
            className="link-dark d-block"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/courses/${course.id}`);
            }}
            key={course.id}
          >
            {course.name}
          </a>
        );
      });
    }
    return undefined;
  }, [courses]);
  return (
    <>
      <Head>
        <title>Courses - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>
              Courses{" "}
              <AiFillPlusCircle
                className="plus-icon"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/courses/add");
                }}
              />
            </h1>
          </Col>
        </Row>
        {isError && <div>Error</div>}
        {isLoading && <div>Loading</div>}
        {courses && CourseList}
      </Container>
    </>
  );
};

export default CoursesIndexPage;
