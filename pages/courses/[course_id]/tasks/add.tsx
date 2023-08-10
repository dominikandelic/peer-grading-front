import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../hooks/useProtectedRoute";
import useAuthorizedAxios from "../../../../hooks/useAuthorizedAxios";
import useCourse from "../../../../hooks/useCourse";
import { AxiosError } from "axios";
import { CreateTaskRequest } from "../../../../api/generated";
import { ErrorContainer } from "../../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../../components/util/LoadingContainer";
import { BASE_URL } from "../../../../env";

const AddTaskPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const { authorizedAxios } = useAuthorizedAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTaskRequest>();
  const { course, isError, isLoading } = useCourse(
    Number(router.query.course_id)
  );

  const onSubmit: SubmitHandler<CreateTaskRequest> = async (data) => {
    try {
      const jsonData = {
        name: data.name,
        course_id: Number(router.query.course_id),
        instructions: data.instructions,
        submissions_number: Number(data.submissions_number),
        deadline: data.deadline,
      };
      await authorizedAxios.post(`${BASE_URL}/api/tasks`, jsonData);
      toast.success(`Uspješno kreiran zadatak ${data.name}`);
      router.push(`/courses/${Number(router.query.course_id)}/`);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.message);
      }
    }
  };

  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;
  return (
    <>
      <Head>
        <title>Dodaj zadatak - PeerGrader</title>
        <meta name="description" content="PeerGrader meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Dodaj zadatak </h1>
          </Col>
        </Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Naziv</Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text"
                  placeholder="Naziv zadatka"
                />
              </Form.Group>
            </Row>
            <Row>
              <h2>Ocjenjivanje</h2>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Upute</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("instructions")}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>
                  Koliko radova studenti uspoređuju i ocjenjuju?
                </Form.Label>
                <Form.Control
                  {...register("submissions_number")}
                  type="number"
                  placeholder="2"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Rok</Form.Label>
                <Form.Control {...register("deadline")} type="datetime-local" />
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" type="submit">
                Podnesi
              </Button>
            </Row>
          </Form>
        </Col>{" "}
      </Container>
    </>
  );
};

export default AddTaskPage;
