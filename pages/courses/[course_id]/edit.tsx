import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useStore } from "zustand";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import { useAuthStore } from "../../../stores/authStore";
import { UpdateCourseRequest } from "../../../api/generated";
import { AxiosError } from "axios";
import useCourse from "../../../hooks/useCourse";
import { ErrorContainer } from "../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../components/util/LoadingContainer";
import { BASE_URL } from "../../../env";

const EditCoursePage = () => {
  useProtectedRoute();
  const { authorizedAxios } = useAuthorizedAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCourseRequest>();

  const router = useRouter();
  const user = useStore(useAuthStore, (store) => store.user);
  const courseId = Number(router.query.course_id);
  const { course, isError, isLoading, mutate } = useCourse(courseId);
  const onSubmit: SubmitHandler<UpdateCourseRequest> = async (data) => {
    try {
      const response = await authorizedAxios.put(
        `${BASE_URL}/api/courses/${courseId}`,
        {
          name: data.name,
        }
      );
      toast.success(`Ažuriran kolegij ${data.name}`);
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
        <title>Uredi kolegij - PeerGrader</title>
        <meta name="description" content="PeerGrader meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Uredi kolegij </h1>
          </Col>
        </Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Kolegij</Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text"
                  defaultValue={course.name}
                />
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

export default EditCoursePage;
