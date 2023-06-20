import Head from "next/head";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/authStore";

type LoginArgs = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};

const RegisterTeacherPage = () => {
  const { set, accessToken } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginArgs>();
  const onSubmit: SubmitHandler<LoginArgs> = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/student",
        {
          username: data.username,
          password: data.password,
          first_name: data.firstName,
          last_name: data.lastName,
        }
      );
      set({
        username: response.data.username,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      });
      toast.success("Success. You can login now");
      router.push("/login");
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.message);
      }
    }
  };

  return (
    <>
      <Container>
        <Head>
          <title>Register student - Peer Grading</title>
          <meta name="description" content="Peer grading meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Col>
          <h1>Student:</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  {...register("firstName")}
                  type="text"
                  placeholder="John"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  {...register("lastName")}
                  type="text"
                  placeholder="Doe"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
      </Container>
    </>
  );
};

export default RegisterTeacherPage;
