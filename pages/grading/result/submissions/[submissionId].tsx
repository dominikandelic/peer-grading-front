import { DateTime } from "luxon";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Row, Card, ListGroup } from "react-bootstrap";
import { ErrorContainer } from "../../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../../components/util/LoadingContainer";
import useProtectedRoute from "../../../../hooks/useProtectedRoute";
import useSubmissionGradingResults from "../../../../hooks/useSubmissionGradingResults";
import { SubmissionGradingResultItem } from "../../../../components/tasks/grading/SubmissionGradingResultItem";

const SubmissionGradingResultPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const submissionId = Number(router.query.submissionId);
  const { submissionGradings, isError, isLoading } =
    useSubmissionGradingResults(submissionId);

  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;
  if (submissionGradings?.length === 0) {
    return (
      <Container>
        <Row>No data</Row>
      </Container>
    );
  }
  if (submissionGradings) {
    return (
      <Container>
        <Head>
          <title>Submission grading results - Peer Grading</title>
          <meta name="description" content="Peer grading meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>
          {submissionGradings[0].submission.submission_task.name} - deadline{" "}
          {DateTime.fromISO(
            submissionGradings[0].submission.submission_task.deadline
          ).toFormat("dd.LL.yyyy. TT")}
        </h1>
        <Card>
          <Card.Body>
            <Card.Title>Grading results</Card.Title>
            <ListGroup variant="flush">
              {submissionGradings.map((submissionGrade, index) => {
                return (
                  <SubmissionGradingResultItem
                    submissionGrade={submissionGrade}
                    index={index}
                  />
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

export default SubmissionGradingResultPage;
