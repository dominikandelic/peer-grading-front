import { useRouter } from "next/router";
import useProtectedRoute from "../../../hooks/useProtectedRoute";
import { Card, Container, ListGroup, Row } from "react-bootstrap";
import useGradingResults from "../../../hooks/useTaskGradingResults";
import { ErrorContainer } from "../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../components/util/LoadingContainer";
import { DateTime } from "luxon";
import Head from "next/head";
import { TaskGradingResultItem } from "../../../components/tasks/grading/TaskGradingResultItem";
import Link from "next/link";

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
        <Row>Nema podataka za prikaz</Row>
      </Container>
    );
  }
  if (gradingResults) {
    return (
      <Container>
        <Head>
          <title>Rezultati zadatka - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>{gradingResults[0].submission.submission_task.name}</h1>
        <p>
          <span className="d-block">
            {" "}
            Upute:{" "}
            {gradingResults[0].submission.submission_task.grading.instructions}
          </span>
          <span>
            Kolegij:{" "}
            <Link
              href={`/courses/${gradingResults[0].submission.submission_task.course.id}`}
            >
              {gradingResults[0].submission.submission_task.course.name}
            </Link>
          </span>
          <span className="d-block">
            Rok:{" "}
            {DateTime.fromISO(
              gradingResults[0].submission.submission_task.deadline
            ).toFormat("dd.LL.yyyy. TT")}
          </span>
        </p>
        <Card>
          <Card.Body>
            <Card.Title>Rezultati zadatka</Card.Title>
            <ListGroup variant="flush">
              {gradingResults.map((result, index) => {
                return <TaskGradingResultItem result={result} index={index} />;
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

export default GradingResultPage;
