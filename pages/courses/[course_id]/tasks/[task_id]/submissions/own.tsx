import { useRouter } from "next/router";
import OwnSubmissionContent from "../../../../../../components/submissions/OwnSubmissionContent";
import useOwnSubmission from "../../../../../../hooks/useOwnSubmission";
import { LoadingContainer } from "../../../../../../components/util/LoadingContainer";
import { ErrorContainer } from "../../../../../../components/util/ErrorContainer";
import useTask from "../../../../../../hooks/useTask";
import { TaskInformation } from "../../../../../../components/tasks/TaskInformation";
import { useAuthStore } from "../../../../../../stores/authStore";
import { Container } from "react-bootstrap";

const OwnSubmissionPage = () => {
  const router = useRouter();
  const taskId = Number(router.query.task_id);
  const { submission, isError, isLoading } = useOwnSubmission(taskId);
  const user = useAuthStore((store) => store.user);
  const {
    task,
    mutate,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  } = useTask(taskId);
  if (isLoading || isLoadingTask) return <LoadingContainer />;
  if (isError || isErrorTask) return <ErrorContainer />;
  if (submission && user && task) {
    return (
      <Container>
        <TaskInformation mutateGrading={mutate} task={task} user={user} />
        <OwnSubmissionContent submission={submission} />
      </Container>
    );
  }
};

export default OwnSubmissionPage;
