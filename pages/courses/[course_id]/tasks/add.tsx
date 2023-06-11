import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../hooks/useProtectedRoute";
import useAuthorizedAxios from "../../../../hooks/useAuthorizedAxios";
import useCourse from "../../../../hooks/useCourse";

type CreateTaskArgs = {
  name: string;
};

const AddTaskPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const { authorizedAxios } = useAuthorizedAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTaskArgs>();
  const { course, isError, isLoading } = useCourse(
    Number(router.query.course_id)
  );
  const onSubmit: SubmitHandler<CreateTaskArgs> = async (data) => {
    try {
      const response = await authorizedAxios.post(
        "http://localhost:8000/api/tasks",
        {
          name: data.name,
          course_id: Number(router.query.course_id),
        }
      );
      toast.success(`Created task ${data.name}`);
      router.push(`/courses/${Number(router.query.course_id)}/`);
    } catch (e) {
      console.log(e);
    }
  };
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>Add task - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Add task </h1>
          </Col>
        </Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text"
                  placeholder="Task name"
                />
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Col>{" "}
      </Container>
    </>
  );
};

export default AddTaskPage;
