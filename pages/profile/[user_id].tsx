import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Head from "next/head";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useUser from "../../hooks/useUser";
import { useRouter } from "next/router";
import { ProfileActionButtons } from "../../components/profile/ProfileActionButtons";
import { useAuthStore } from "../../stores/authStore";

const UserProfileViewPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const userId = Number(router.query.user_id);
  const { user, isError, isLoading } = useUser(userId);
  const loggedInUser = useAuthStore((store) => store.user);
  return (
    <>
      <Head>
        <title>Pregled profila - PeerGrader</title>
        <meta name="description" content="PeerGrader meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Profil</h1>
          </Col>
        </Row>
        {isError && <div>Pogreška</div>}
        {isLoading && <div>Učitavam</div>}
        {user && (
          <>
            <Form>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Ime</Form.Label>
                  <Form.Control type="text" defaultValue={user.first_name} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Prezime</Form.Label>
                  <Form.Control type="text" defaultValue={user.last_name} />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Uloga</Form.Label>
                  <Form.Control
                    readOnly
                    disabled
                    type="text"
                    defaultValue={user.is_student ? "Student" : "Profesor"}
                  />
                </Form.Group>
              </Row>
              {(loggedInUser!.id === user.id || loggedInUser?.is_superuser) && (
                <ProfileActionButtons user={user} />
              )}
            </Form>
          </>
        )}
      </Container>
    </>
  );
};

export default UserProfileViewPage;
