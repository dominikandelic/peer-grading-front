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
import { LoadingContainer } from "../../../../../../components/util/LoadingContainer";
import { ErrorContainer } from "../../../../../../components/util/ErrorContainer";
import { AxiosError } from "axios";
import { BASE_URL } from "../../../../../../env";

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
  const courseId = Number(router.query.course_id);
  const taskId = Number(router.query.task_id);
  const onSubmit: SubmitHandler<CreateSubmissionArgs> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("file", data.file[0]);
      formData.append(
        "details",
        JSON.stringify({
          task_id: task?.id,
        })
      );

      const response = await authorizedAxios.post(
        `${BASE_URL}/api/submissions`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(`Submission uploaded`);
      router.push(`/courses/${courseId}/tasks/${taskId}/submissions/own`);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data);
      }
    }
  };
  if (isError || isErrorSubmit) return <ErrorContainer />;
  if (isLoading || isLoadingSubmit) return <LoadingContainer />;

  if (hasSubmitted) {
    router.push(`/courses/${courseId}/tasks/${taskId}/submissions/own`);
    return;
  }

  if (task?.grading.status == "STARTED") {
    return (
      <Container>
        <Head>
          <title>Dodaj rad - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Alert variant="warning">
          Ne možete više dodavati radove, ocjenjivanje je počelo!
        </Alert>
      </Container>
    );
  }

  if (task?.grading.status == "STANDBY") {
    return (
      <>
        <Head>
          <title>Dodaj rad - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Row>
            <Col>
              <h1>Dodaj rad za - {task!.name}</h1>
            </Col>
          </Row>
          <Row>Zadatak: {task!.name}</Row>
          <Row>Upute: {task.grading.instructions}</Row>
          <Col>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Form.Group className="mb-3">
                  <Form.Label>Tvoj rad</Form.Label>
                  <Form.Control {...register("file")} type="file" />
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
  }

  if (task?.grading.status == "FINISHED") {
    return "Results soon!";
  }
};

export default AddSubmissionPage;
