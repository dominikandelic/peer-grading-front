import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../../../hooks/useProtectedRoute";
import useTask from "../../../../../../hooks/useTask";
import useTaskSubmissions from "../../../../../../hooks/useTaskSubmissions";
import { GradingInformation } from "../../../../../../components/tasks/GradingInformation";
import { SubmissionList } from "../../../../../../components/submissions/SubmissionList";

const SubmissionsIndexPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const taskId = Number(router.query.task_id);
  const { task, isError, isLoading, mutate } = useTask(taskId);
  const {
    submissions,
    isError: isErrorSubmissions,
    isLoading: isLoadingSubmissions,
  } = useTaskSubmissions(taskId);
  if (isError || isErrorSubmissions) return <Container>Error</Container>;
  if (isLoading || isLoadingSubmissions)
    return (
      <Container>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  if (task) {
    return (
      <>
        <Head>
          <title>Submissions - Peer Grading</title>
          <meta name="description" content="Peer grading meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Row>
            <h1>{task!.name} submissions</h1>
          </Row>
          <GradingInformation mutateGrading={mutate} task={task!} />
          <SubmissionList submissions={submissions} />
        </Container>
      </>
    );
  }
};

export default SubmissionsIndexPage;
