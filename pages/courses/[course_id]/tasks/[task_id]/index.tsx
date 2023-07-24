import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { UpdateTaskRequest } from "../../../../../api/generated";
import useAuthorizedAxios from "../../../../../hooks/useAuthorizedAxios";
import useProtectedRoute from "../../../../../hooks/useProtectedRoute";
import useTask from "../../../../../hooks/useTask";
import { DateTime } from "luxon";
import { ErrorContainer } from "../../../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../../../components/util/LoadingContainer";

const EditTaskPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const { authorizedAxios } = useAuthorizedAxios();
  const taskId = Number(router.query.task_id);
  const { task, isError, isLoading, mutate } = useTask(taskId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateTaskRequest>();

  const onSubmit: SubmitHandler<UpdateTaskRequest> = async (data) => {
    try {
      const jsonData = {
        name: data.name,
        course_id: Number(router.query.course_id),
        instructions: data.instructions,
        submissions_number: Number(data.submissions_number),
        deadline: data.deadline,
      };
      await authorizedAxios.put(
        `http://localhost:8000/api/tasks/${taskId}`,
        jsonData
      );
      toast.success(`Edited task ${data.name}`);
      mutate();
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
        <title>Edit task - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Edit task </h1>
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
                  defaultValue={task?.name}
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
                  defaultValue={task?.grading.instructions}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Submissions to compare</Form.Label>
                <Form.Control
                  {...register("submissions_number")}
                  type="number"
                  defaultValue={task?.grading.submissions_number}
                  placeholder="2"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Deadline</Form.Label>
                <Form.Control
                  {...register("deadline")}
                  type="datetime-local"
                  defaultValue={
                    DateTime.fromISO(task?.deadline!).toISO({
                      includeOffset: false,
                    })!
                  }
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

export default EditTaskPage;
