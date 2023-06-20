import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import useUser from "../../../hooks/useUser";
import TeacherCourseContent from "../../../components/courses/TeacherCourseContent";
import StudentCourseContent from "../../../components/courses/StudentCourseContent";
import { useRouter } from "next/router";

const CourseDetailPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const courseId = Number(router.query.course_id);
  const { user, isError, isLoading } = useUser();
  if (isError) return "Error";
  if (isLoading) return "Loading...";

  return (
    <>
      <Head>
        <title>Course Details - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Course Details</h1>
          </Col>
        </Row>
        {user.is_teacher ? (
          <TeacherCourseContent user={user} />
        ) : (
          <StudentCourseContent courseId={courseId} user={user} />
        )}
      </Container>
    </>
  );
};

export default CourseDetailPage;
