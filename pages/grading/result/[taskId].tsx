import { useRouter } from "next/router";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import { Card, Container, ListGroup, Row } from "react-bootstrap";
import useGradingResults from "../../../hooks/useGradingResults";
import { ErrorContainer } from "../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../components/util/LoadingContainer";
import { GradingResultItem } from "../../../components/tasks/grading/GradingResultItem";
import { DateTime } from "luxon";
import Head from "next/head";

const GradingResultPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const taskId = Number(router.query.taskId);
  const { gradingResults, isError, isLoading } = useGradingResults(taskId);

  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;
  if (gradingResults?.length === 0) {
    return (
      <Container>
        <Row>No data</Row>
      </Container>
    );
  }
  if (gradingResults) {
    return (
      <Container>
        <Head>
          <title>Grading results - Peer Grading</title>
          <meta name="description" content="Peer grading meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>
          {gradingResults[0].submission.submission_task.name} - deadline{" "}
          {DateTime.fromISO(
            gradingResults[0].submission.submission_task.deadline
          ).toFormat("dd.LL.yyyy. TT")}
        </h1>
        <Card>
          <Card.Body>
            <Card.Title>Grading Results</Card.Title>
            <ListGroup variant="flush">
              {gradingResults.map((result, index) => {
                return <GradingResultItem result={result} index={index} />;
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

export default GradingResultPage;
