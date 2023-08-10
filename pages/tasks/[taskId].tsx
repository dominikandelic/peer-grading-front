import { useRouter } from "next/router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { LoadingContainer } from "../../components/util/LoadingContainer";
import { ErrorContainer } from "../../components/util/ErrorContainer";
import { Container, Row } from "react-bootstrap";
import Head from "next/head";
import useTask from "../../hooks/useTask";
import { TaskInformation } from "../../components/tasks/TaskInformation";
import { useAuthStore } from "../../stores/authStore";
import { SubmissionList } from "../../components/submissions/SubmissionList";

const TaskViewPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const taskId = Number(router.query.taskId);

  const { task, isError, isLoading, mutate } = useTask(taskId);
  const user = useAuthStore((store) => store.user);
  if (isLoading) return <LoadingContainer />;
  if (isError) return <ErrorContainer />;

  if (task && user) {
    return (
      <Container>
        <Head>
          <title>Zadatak - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Row>
          <TaskInformation user={user} mutateGrading={mutate} task={task} />
        </Row>
        {(user.is_teacher || user.is_superuser) && (
          <Row className="mt-5">
            <h2>Predani radovi</h2>
            <SubmissionList taskId={task.id} />
          </Row>
        )}
      </Container>
    );
  }
};

export default TaskViewPage;
