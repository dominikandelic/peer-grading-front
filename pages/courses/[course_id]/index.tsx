import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import TeacherCourseContent from "../../../components/courses/TeacherCourseContent";
import StudentCourseContent from "../../../components/courses/StudentCourseContent";
import { useRouter } from "next/router";
import useStore from "../../../hooks/useStore";
import { useAuthStore } from "../../../stores/authStore";

const CourseDetailPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const courseId = Number(router.query.course_id);
  const user = useStore(useAuthStore, (store) => store.user);
  if (user) {
    return (
      <>
        <Head>
          <title>Detalji kolegija - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Row>
            <Col>
              <h1>Detalji kolegija</h1>
            </Col>
          </Row>
          {user.is_teacher || user.is_superuser ? (
            <TeacherCourseContent user={user} />
          ) : (
            <StudentCourseContent courseId={courseId} user={user} />
          )}
        </Container>
      </>
    );
  }
};

export default CourseDetailPage;
