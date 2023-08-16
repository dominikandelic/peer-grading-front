import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import useStudents from "../../../hooks/useStudents";
import { AxiosError } from "axios";
import { BASE_URL } from "../../../env";

type EnrollStudentArgs = {
  studentId: number;
};

const EnrollStudentsPage = () => {
  useProtectedRoute();
  const { authorizedAxios } = useAuthorizedAxios();
  const { register, handleSubmit } = useForm<EnrollStudentArgs>();
  const { students, isError, isLoading } = useStudents();
  const router = useRouter();
  const courseId = Number(router.query.course_id);
  const onSubmit: SubmitHandler<EnrollStudentArgs> = async (data) => {
    try {
      await authorizedAxios.put(
        `${BASE_URL}/api/courses/${courseId}/enroll-students`,
        {
          student_id: data.studentId,
        }
      );
      toast.success(`Student upisan`);
      router.push(`/courses/${courseId}`);
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Upiši studente - PeerGrader</title>
        <meta name="description" content="PeerGrader meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <Col>
            <h1>Upiši studente</h1>
          </Col>
        </Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Student</Form.Label>
                <Form.Select {...register("studentId")}>
                  {isLoading && <option>Učitavam...</option>}
                  {isError && (
                    <option>Greška prilikom dohvata studenata</option>
                  )}
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
                Podnesi
              </Button>
            </Row>
          </Form>
        </Col>{" "}
      </Container>
    </>
  );
};

export default EnrollStudentsPage;
