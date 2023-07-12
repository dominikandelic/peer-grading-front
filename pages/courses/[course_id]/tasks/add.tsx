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
      console.log(jsonData);

      await authorizedAxios.post("http://localhost:8000/api/tasks", jsonData);
      toast.success(`Created task ${data.name}`);
      router.push(`/courses/${Number(router.query.course_id)}/`);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.message);
      }
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
              <h2>Grading</h2>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Instructions</Form.Label>
                <Form.Control
                  {...register("instructions")}
                  type="text"
                  placeholder="We will only accept PDF submissions"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Submissions to compare</Form.Label>
                <Form.Control
                  {...register("submissions_number")}
                  type="number"
                  placeholder="2"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control {...register("deadline")} type="datetime-local" />
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
