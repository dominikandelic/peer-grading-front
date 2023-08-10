import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import useProtectedRoute from "../../../../../../hooks/useProtectedRoute";
import useTask from "../../../../../../hooks/useTask";
import useTaskSubmissions from "../../../../../../hooks/useTaskSubmissions";
import { TaskInformation } from "../../../../../../components/tasks/TaskInformation";
import { SubmissionList } from "../../../../../../components/submissions/SubmissionList";
import { useAuthStore } from "../../../../../../stores/authStore";
import { ErrorContainer } from "../../../../../../components/util/ErrorContainer";
import { LoadingContainer } from "../../../../../../components/util/LoadingContainer";

const SubmissionsIndexPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const taskId = Number(router.query.task_id);
  const { task, isError, isLoading, mutate } = useTask(taskId);
  const user = useAuthStore((store) => store.user);
  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;
  if (task && user) {
    return (
      <>
        <Head>
          <title>Radovi - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container>
          <Row>
            <h1>{task!.name} radovi</h1>
          </Row>
          <TaskInformation user={user} mutateGrading={mutate} task={task!} />
          <SubmissionList taskId={taskId} />
        </Container>
      </>
    );
  }
};

export default SubmissionsIndexPage;
