import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import useTeachers from "../../../hooks/useTeachers";
import { useAuthStore } from "../../../stores/authStore";
import useStudents from "../../../hooks/useStudents";

type EnrollStudentArgs = {
  studentId: number;
};

const EnrollStudentsPage = () => {
  useProtectedRoute();
  const { authorizedAxios } = useAuthorizedAxios();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EnrollStudentArgs>();
  const { students, isError, isLoading } = useStudents();
  const router = useRouter();
  const courseId = Number(router.query.course_id);
  const auth = useAuthStore();
  const onSubmit: SubmitHandler<EnrollStudentArgs> = async (data) => {
    try {
      const response = await authorizedAxios.post(
        `http://localhost:8000/api/courses/${courseId}/enroll-students`,
        {
          student_id: data.studentId,
        }
      );
      toast.success(`Added student ${data.studentId}`);
      router.push(`/courses/${courseId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Enroll students - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Enroll students</h1>
          </Col>
        </Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Student</Form.Label>
                <Form.Select {...register("studentId")}>
                  {isLoading && <option>Loading...</option>}
                  {isError && <option>Error fetching students</option>}
                  {students &&
                    students.map((student) => {
                      return (
                        <option key={student.id} value={student.id}>
                          {`${student.first_name} ${student.last_name}`}
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

export default EnrollStudentsPage;
