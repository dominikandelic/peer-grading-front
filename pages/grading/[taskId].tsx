import { useRouter } from "next/router";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import useGradingSubmissions from "../../hooks/useGradingSubmissions";
import { LoadingContainer } from "../../components/util/LoadingContainer";
import { ErrorContainer } from "../../components/util/ErrorContainer";
import { Container } from "react-bootstrap";
import { GradingForm } from "../../components/tasks/grading/GradingForm";
import Head from "next/head";

const GradeSubmissionsPage = () => {
  useProtectedRoute();
  const router = useRouter();
  const taskId = Number(router.query.taskId);

  const { submissions, isError, isLoading } = useGradingSubmissions(taskId);

  if (isLoading) return <LoadingContainer />;
  if (isError) return <ErrorContainer />;

  if (submissions) {
    return (
      <Container>
        <Head>
          <title>Grade submissions - Peer Grading</title>
          <meta name="description" content="Peer grading meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <GradingForm taskId={taskId} submissions={submissions} />
      </Container>
    );
  }
};

export default GradeSubmissionsPage;
