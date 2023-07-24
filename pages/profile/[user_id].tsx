import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Head from "next/head";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import { useAuthStore } from "../../stores/authStore";
import { ProfileActionButtons } from "../../components/profile/ProfileActionButtons";

const UserProfileViewPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const userId = Number(router.query.user_id);
  const { user, isError, isLoading } = useUser(userId);
  return (
    <>
      <Head>
        <title>View Profile - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Profile</h1>
          </Col>
        </Row>
        {isError && <div>Error</div>}
        {isLoading && <div>Loading</div>}
        {user && (
          <>
            <Form>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" defaultValue={user.first_name} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" defaultValue={user.last_name} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    readOnly
                    disabled
                    type="text"
                    defaultValue={user.is_student ? "Student" : "Teacher"}
                  />
                </Form.Group>
              </Row>
              <ProfileActionButtons user={user} />
            </Form>
          </>
        )}
      </Container>
    </>
  );
};

export default UserProfileViewPage;
