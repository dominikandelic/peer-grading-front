import { Button, Card, Form, Row } from "react-bootstrap";
import {
  GradeSubmissionRequest,
  SubmissionResponse,
} from "../../../api/generated";
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import useAuthorizedAxios from "../../../hooks/useAuthorizedAxios";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

type GradingFormProps = {
  submissions: SubmissionResponse[];
  taskId: number;
};

export const GradingForm = ({ submissions, taskId }: GradingFormProps) => {
  const { handleSubmit, register } = useForm<GradeSubmissionRequest[]>();
  const { authorizedAxios } = useAuthorizedAxios();
  const router = useRouter();
  const onSubmit: SubmitHandler<GradeSubmissionRequest[]> = async (data) => {
    try {
      await authorizedAxios.put(
        `http://localhost:8000/api/grading/${taskId}`,
        Object.values(data).map((item) => ({
          submission_id: Number(item.submission_id),
          grade: Number(item.grade),
        }))
      );
      toast.success("Successfully graded, taking you back to the tasks screen");
      router.back();
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <h2>
          Grade each submission from 1 to {submissions.length}, with{" "}
          {submissions.length} being the best
        </h2>
        <span></span>
        {submissions.map((submission: SubmissionResponse, index) => {
          const url = `http://localhost:8000${submission.file.replace(
            "uploads/",
            ""
          )}`;
          return (
            <Card
              className="m-2 p-0"
              style={{ width: "18rem" }}
              key={submission.id}
            >
              <Card.Body>
                <Card.Title>Submission #{index + 1}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <Form.Group>
                    <input
                      type="hidden"
                      {...register(`${index}.submission_id`)}
                      defaultValue={submission.id}
                    />
                    <Form.Label>Grade:</Form.Label>
                    <Form.Control
                      min="1"
                      max={submissions.length}
                      {...register(`${index}.grade`)}
                      type="number"
                    />
                  </Form.Group>
                </Card.Subtitle>
                <Card.Link target="_blank" href={url}>
                  View submission
                </Card.Link>
              </Card.Body>
            </Card>
          );
        })}
        <Button
          onClick={handleSubmit(onSubmit)}
          type="submit"
          variant="primary"
        >
          Submit
        </Button>
      </Row>
    </form>
  );
};
