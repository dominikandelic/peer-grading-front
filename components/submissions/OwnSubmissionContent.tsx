import { Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { SubmissionResponse } from "../../api/generated";

type SubmissionContentProps = {
  submission: SubmissionResponse;
};

const OwnSubmissionContent = ({ submission }: SubmissionContentProps) => {
  const url = `http://localhost:8000${submission.file}`;

  return (
    <Container>
      <Row>
        <h1>{`${submission.student.first_name} ${submission.student.last_name}'s submission`}</h1>
      </Row>
      <Row>
        <a target="_blank" href={url}>
          View submission
        </a>
      </Row>
    </Container>
  );
};

export default OwnSubmissionContent;
