import { Container, Row, Col, Card } from "react-bootstrap";
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
          <h1>{task!.name} submissions</h1>
        </Row>
        <GradingInformation mutateGrading={mutate} task={task!} />
        <SubmissionList submissions={submissions} />
      </Container>
    </>
  );
};

export default SubmissionsIndexPage;
