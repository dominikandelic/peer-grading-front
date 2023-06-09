import Head from "next/head";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Navigation from "../components/Navbar";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type LoginArgs = {
  username: string;
  password: string;
};

const LoginPage = () => {
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
        "http://localhost:8000/api/token/pair",
        {
          username: data.username,
          password: data.password,
        }
      );
      set({
        username: response.data.username,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      });
      toast("Success!!");
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <Head>
          <title>Login - Peer Grading</title>
          <meta name="description" content="Peer grading meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
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

export default LoginPage;
