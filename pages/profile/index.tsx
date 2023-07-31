import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import Head from "next/head";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useUser from "../../hooks/useUser";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { toast } from "react-toastify";
import { ProfileActionButtons } from "../../components/profile/ProfileActionButtons";
import { useAuthStore } from "../../stores/authStore";
import { AxiosError } from "axios";
import { BASE_URL } from "../../env";

type EditProfileArgs = {
  firstName: string;
  lastName: string;
};

const ProfileIndexPage = () => {
  useProtectedRoute();

  const { user, isError, isLoading, mutate } = useUser();
  const loggedInUser = useAuthStore((store) => store.user);
  const { authorizedAxios } = useAuthorizedAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileArgs>();
  const onSubmit: SubmitHandler<EditProfileArgs> = async (data) => {
    try {
      const response = await authorizedAxios.put(`${BASE_URL}/api/profile`, {
        first_name: data.firstName,
        last_name: data.lastName,
      });
      mutate();
      toast.success(`Success`);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Profile - Peer Grading</title>
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    {...register("firstName")}
                    type="text"
                    defaultValue={user.first_name}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    {...register("lastName")}
                    type="text"
                    defaultValue={user.last_name}
                  />
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

export default ProfileIndexPage;
