import { useRouter } from "next/router";
import OwnSubmissionContent from "../../../../../../components/submissions/OwnSubmissionContent";
import useOwnSubmission from "../../../../../../hooks/useOwnSubmission";
import { LoadingContainer } from "../../../../../../components/util/LoadingContainer";
import { ErrorContainer } from "../../../../../../components/util/ErrorContainer";
import useTask from "../../../../../../hooks/useTask";
import { TaskInformation } from "../../../../../../components/tasks/TaskInformation";
import { useAuthStore } from "../../../../../../stores/authStore";
import { Container } from "react-bootstrap";
import Head from "next/head";
import useAuthorizedAxios from "../../../../../../hooks/useAuthorizedAxios";
import { SubmitHandler } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export type UpdateSubmissionArgs = {
  file: FileList;
};

const OwnSubmissionPage = () => {
  const router = useRouter();
  const taskId = Number(router.query.task_id);
  const {
    submission,
    isError,
    isLoading,
    mutate: mutateSubmission,
  } = useOwnSubmission(taskId);
  const user = useAuthStore((store) => store.user);
  const {
    task,
    mutate,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  } = useTask(taskId);
  const { authorizedAxios } = useAuthorizedAxios();

  if (isLoading || isLoadingTask) return <LoadingContainer />;
  if (isError || isErrorTask) return <ErrorContainer />;
  if (submission && user && task) {
    return (
      <Container>
        <Head>
          <title>Vlastiti rad - PeerGrader</title>
          <meta name="description" content="PeerGrader meta desc..." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TaskInformation mutateGrading={mutate} task={task} user={user} />
        <OwnSubmissionContent
          mutate={mutateSubmission}
          submission={submission}
        />
      </Container>
    );
  }
};

export default OwnSubmissionPage;
