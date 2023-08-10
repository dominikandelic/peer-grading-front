import { Card, Row } from "react-bootstrap";
import { SubmissionResponse } from "../../api/generated";
import { BASE_URL } from "../../env";
import useTaskSubmissions from "../../hooks/useTaskSubmissions";
import { ErrorContainer } from "../util/ErrorContainer";
import { LoadingContainer } from "../util/LoadingContainer";
import { DateTime } from "luxon";

type SubmissionListProps = {
  taskId: number;
};

export const SubmissionList = ({ taskId }: SubmissionListProps) => {
  const { submissions, isError, isLoading } = useTaskSubmissions(taskId);

  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;

  if (submissions) {
    if (submissions.length === 0) {
      return <Row>Nema podataka za prikaz</Row>;
    }
    if (submissions.length > 0) {
      return (
        <Row>
          {submissions.map((submission: SubmissionResponse) => {
            const url = `${BASE_URL}${submission.file.replace("uploads/", "")}`;
            return (
              <Card
                className="m-2 p-0"
                style={{ width: "18rem" }}
                key={submission.id}
              >
                <Card.Body>
                  <Card.Title>
                    {submission.student.first_name}{" "}
                    {submission.student.last_name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Kreiran:{" "}
                    <b>
                      {DateTime.fromISO(submission.created_at).toFormat(
                        "dd.LL.yyyy. TT"
                      )}
                    </b>
                  </Card.Subtitle>
                  <Card.Link target="_blank" href={url}>
                    Pregledaj rad
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      );
    }
  }
};
