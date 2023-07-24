import useOwnSubmission from "../../hooks/useOwnSubmission";
import { Container, Row, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import { LoadingContainer } from "../util/LoadingContainer";
import { ErrorContainer } from "../util/ErrorContainer";

type SubmissionContentProps = {
  taskId: number;
};

const SubmissionContent = ({ taskId }: SubmissionContentProps) => {
  // TODO Make this compatible with any submission, not just own
  const { submission, isError, isLoading } = useOwnSubmission(taskId);
  const router = useRouter();
  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;

  const url = `http://localhost:8000${submission.file}`;

  return (
    <Container>
      <Row>
        <h1>{`${submission.student.first_name} ${submission.student.last_name}'s submission`}</h1>
      </Row>
      <Row>
        <a target="_blank" href={url}>
          Link
        </a>
      </Row>
    </Container>
  );
};

export default SubmissionContent;
