import Head from "next/head";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "../env";

type LoginArgs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const { set } = useAuthStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginArgs>();
  const onSubmit: SubmitHandler<LoginArgs> = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/token/pair`, {
        username: data.username,
        password: data.password,
      });
      set({
        user: response.data.user,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      });
      toast.success("Success");
      router.push("/");
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
          <title>Prijava - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control
                  {...register("username")}
                  type="text"
                  placeholder="peroperic"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control {...register("password")} type="password" />
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" type="submit">
                Podnesi
              </Button>
            </Row>
          </Form>
        </Col>
      </Container>
    </>
  );
};

export default LoginPage;
