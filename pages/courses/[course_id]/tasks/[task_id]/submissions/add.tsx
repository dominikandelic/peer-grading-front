import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../../../hooks/useProtectedRoute";
import useAuthorizedAxios from "../../../../../../hooks/useAuthorizedAxios";
import useTask from "../../../../../../hooks/useTask";
import useStudentSubmissionChecker from "../../../../../../hooks/useHasSubmitted";
import SubmissionContent from "../../../../../../components/submissions/SubmissionContent";

type CreateSubmissionArgs = {
  file: FileList;
};

const AddSubmissionPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const {
    hasSubmitted,
    isError: isErrorSubmit,
    isLoading: isLoadingSubmit,
  } = useStudentSubmissionChecker(Number(router.query.task_id));
  const { authorizedAxios } = useAuthorizedAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateSubmissionArgs>();

  const { task, isError, isLoading } = useTask(Number(router.query.task_id));
  const onSubmit: SubmitHandler<CreateSubmissionArgs> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("file", data.file[0]);
      formData.append(
        "details",
        JSON.stringify({
          task_id: Number(router.query.task_id),
        })
      );

      const response = await authorizedAxios.post(
        "http://localhost:8000/api/submissions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(`Submission uploaded`);
      router.push(`/courses/${Number(router.query.course_id)}/`);
    } catch (e) {
      console.log(e);
    }
  };
  if (isError || isErrorSubmit) return <Container>Error</Container>;
  if (isLoading || isLoadingSubmit)
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );

  if (hasSubmitted) {
    return <SubmissionContent taskId={task!.id} />;
  }

  if (task?.grading.status == "STARTED") {
    return (
      <Container>
        <Alert variant="warning">
          Can't submit anymore, grading has started!
        </Alert>
      </Container>
    );
  }

  if (task?.grading.status == "STANDBY") {
    return (
      <>
        <Head>
          <title>Add submission - Peer Grading</title>
          <meta name="description" content="Peer grading meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Row>
            <Col>
              <h1>Add submission for - {task!.name}</h1>
            </Col>
          </Row>
          <Row>Task: {task!.name}</Row>
          <Row>Instructions: {task.grading.instructions}</Row>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Your submission</Form.Label>
                  <Form.Control {...register("file")} type="file" />
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
  }

  if (task?.grading.status == "FINISHED") {
    return "Results soon!";
  }
};

export default AddSubmissionPage;
