import { DateTime } from "luxon";
import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Row, Card, ListGroup } from "react-bootstrap";
import { ErrorContainer } from "../../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../../components/util/LoadingContainer";
import useProtectedRoute from "../../../../hooks/useProtectedRoute";
import useSubmissionGradingResults from "../../../../hooks/useSubmissionGradingResults";
import { SubmissionGradingResultItem } from "../../../../components/tasks/grading/SubmissionGradingResultItem";
import { BASE_URL } from "../../../../env";
import Link from "next/link";

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
        <Row>Nema podataka za prikaz</Row>
      </Container>
    );
  }
  if (submissionGradings) {
    const url = `${BASE_URL}${submissionGradings[0].submission.file.replace(
      "uploads/",
      ""
    )}`;
    return (
      <Container>
        <Head>
          <title>Rezultati pojedinog rada - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>{submissionGradings[0].submission.submission_task.name}</h1>
        <span>
          Upute:{" "}
          {
            submissionGradings[0].submission.submission_task.grading
              .instructions
          }
        </span>
        <p>
          <span className="d-block">
            Kolegij:{" "}
            <Link
              className="link"
              href={`/courses/${submissionGradings[0].submission.submission_task.course.id}`}
            >
              {submissionGradings[0].submission.submission_task.course.name}
            </Link>
          </span>
          <span>
            {" "}
            Rok:{" "}
            {DateTime.fromISO(
              submissionGradings[0].submission.submission_task.deadline
            ).toFormat("dd.LL.yyyy. TT")}
          </span>
          <a className="d-block" target="_blank" href={url}>
            Pregledaj rad
          </a>
        </p>
        <Card>
          <Card.Body>
            <Card.Title>Ocjene za rad</Card.Title>
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
