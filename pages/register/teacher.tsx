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
        "http://127.0.0.1:8000/api/register/teacher",
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
      toast.success("Uspjeh, možeš se prijaviti sada");
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
          <title>Registracija profesora - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Col>
          <h1>Profesor:</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Ime</Form.Label>
                <Form.Control
                  {...register("firstName")}
                  type="text"
                  placeholder="Pero"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Prezime</Form.Label>
                <Form.Control
                  {...register("lastName")}
                  type="text"
                  placeholder="Perić"
                />
              </Form.Group>
            </Row>
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

export default RegisterTeacherPage;
