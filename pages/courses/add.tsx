import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import useTeachers from "../../hooks/useTeachers";
import { useAuthStore } from "../../stores/authStore";
import useStore from "../../hooks/useStore";

type CreateCourseArgs = {
  name: string;
  teacherId: number;
};

const AddCoursePage = () => {
  useProtectedRoute();
  const { authorizedAxios } = useAuthorizedAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateCourseArgs>();
  const { teachers, isError, isLoading } = useTeachers();
  const router = useRouter();
  const user = useStore(useAuthStore, (store) => store.user);
  const onSubmit: SubmitHandler<CreateCourseArgs> = async (data) => {
    try {
      const response = await authorizedAxios.post(
        "http://localhost:8000/api/courses",
        {
          name: data.name,
          teacher_id: data.teacherId,
        }
      );
      toast.success(`Created course ${data.name}`);
      router.push("/courses");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Add course - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Add course </h1>
          </Col>
        </Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Course</Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text"
                  placeholder="Course name"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Teacher</Form.Label>
                <Form.Select {...register("teacherId")}>
                  {isLoading && <option>Loading...</option>}
                  {isError && <option>Error fetching teachers</option>}
                  {teachers &&
                    teachers.map((teacher) => {
                      return (
                        <option key={teacher.id} value={teacher.id}>
                          {`${teacher.first_name} ${teacher.last_name}`}{" "}
                          {user &&
                            teacher.username === user.username &&
                            "(you)"}
                        </option>
                      );
                    })}
                </Form.Select>
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

export default AddCoursePage;
