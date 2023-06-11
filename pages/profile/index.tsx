import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Head from "next/head";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useUser from "../../hooks/useUser";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { toast } from "react-toastify";

type EditProfileArgs = {
  firstName: string;
  lastName: string;
};

const ProfileIndexPage = () => {
  useProtectedRoute();
  const { user, isError, isLoading, mutate } = useUser();
  const { authorizedAxios } = useAuthorizedAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileArgs>();

  const onSubmit: SubmitHandler<EditProfileArgs> = async (data) => {
    try {
      const response = await authorizedAxios.put(
        "http://localhost:8000/api/profile",
        {
          first_name: data.firstName,
          last_name: data.lastName,
        }
      );
      mutate();
      toast.success(`Success`);
    } catch (e) {
      console.log(e);
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ProfileIndexPage;
