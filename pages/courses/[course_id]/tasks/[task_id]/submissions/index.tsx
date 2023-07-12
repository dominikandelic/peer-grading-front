import { Container, Row, Col, Card } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../../../hooks/useProtectedRoute";
import useTask from "../../../../../../hooks/useTask";
import { DateTime } from "luxon";
import useTaskSubmissions from "../../../../../../hooks/useTaskSubmissions";
import { SubmissionResponse } from "../../../../../../api/generated";
import { GradingInformation } from "../../../../../../components/tasks/GradingInformation";

const SubmissionsIndexPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const taskId = Number(router.query.task_id);
  const { task, isError, isLoading } = useTask(taskId);
  const {
    submissions,
    isError: isErrorSubmissions,
    isLoading: isLoadingSubmissions,
  } = useTaskSubmissions(taskId);
  if (isError || isErrorSubmissions) return <div>Error</div>;
  if (isLoading || isLoadingSubmissions) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Submissions - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row>
          <h1>{task!.name} submissions </h1>
        </Row>
        <GradingInformation task={task!} />
        <Row>
          {submissions.map((submission: SubmissionResponse) => {
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
                  <Card.Title>
                    {submission.student.first_name}{" "}
                    {submission.student.last_name}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Created at: {submission.created_at}
                  </Card.Subtitle>
                  <Card.Link target="_blank" href={url}>
                    View submission
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SubmissionsIndexPage;
