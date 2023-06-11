import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../../../hooks/useProtectedRoute";
import useAuthorizedAxios from "../../../../../../hooks/useAuthorizedAxios";
import useTask from "../../../../../../hooks/useTask";

type CreateSubmissionArgs = {
  file: FileList;
};

const AddSubmissionPage = () => {
  useProtectedRoute();
  const router = useRouter();
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
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading...</div>;
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
            <h1>Add submission for - {task.name}</h1>
          </Col>
        </Row>
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
};

export default AddSubmissionPage;
