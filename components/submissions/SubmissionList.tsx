import { Card, Row } from "react-bootstrap";
import { SubmissionResponse } from "../../api/generated";
import { BASE_URL } from "../../env";

type SubmissionListProps = {
  submissions: SubmissionResponse[];
};

export const SubmissionList = ({ submissions }: SubmissionListProps) => {
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
                {submission.student.first_name} {submission.student.last_name}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Kreiran: {submission.created_at}
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
};
