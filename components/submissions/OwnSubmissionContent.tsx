import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { SubmissionResponse } from "../../api/generated";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateSubmissionArgs } from "../../pages/courses/[course_id]/tasks/[task_id]/submissions/own";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { AxiosError } from "axios";
import { BASE_URL } from "../../env";

type SubmissionContentProps = {
  submission: SubmissionResponse;
  mutate: KeyedMutator<SubmissionResponse>;
};

const OwnSubmissionContent = ({
  submission,
  mutate,
}: SubmissionContentProps) => {
  const url = `${BASE_URL}${submission.file}`;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateSubmissionArgs>();
  const { authorizedAxios } = useAuthorizedAxios();
  const onSubmit: SubmitHandler<UpdateSubmissionArgs> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("_method", "put");

      const response = await authorizedAxios.post(
        `${BASE_URL}/api/submissions/${submission.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(`Submission updated`);
      mutate();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data);
      }
    }
  };

  return (
    <Container>
      <Row>
        <h1>{`${submission.student.first_name} ${submission.student.last_name}'s submission`}</h1>
      </Row>
      <Row className="mb-3">
        <a target="_blank" href={url}>
          View submission
        </a>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Change submission</Form.Label>
                <Form.Control {...register("file")} type="file" />
              </Form.Group>
            </Row>
            <Row>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OwnSubmissionContent;
