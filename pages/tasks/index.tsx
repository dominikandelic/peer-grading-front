import Head from "next/head";
import useActiveTasks from "../../hooks/useActiveTasks";
import { Container } from "react-bootstrap";
import useStore from "../../hooks/useStore";
import { useAuthStore } from "../../stores/authStore";
import StudentTaskList from "../../components/tasks/StudentTaskList";
import TeacherTaskList from "../../components/tasks/TeacherTaskList";
import { ErrorContainer } from "../../components/util/ErrorContainer";
import { LoadingContainer } from "../../components/util/LoadingContainer";

const ActiveTasksIndexPage = () => {
  const { tasks, isError, isLoading, mutate } = useActiveTasks();
  const user = useStore(useAuthStore, (store) => store.user);
  let taskList: JSX.Element | undefined = undefined;

  if (user && tasks) {
    if (user.is_student) {
      taskList = <StudentTaskList tasks={tasks} />;
    } else {
      taskList = <TeacherTaskList mutateGrading={mutate} tasks={tasks} />;
    }
  }

  if (isError) return <ErrorContainer />;
  if (isLoading) return <LoadingContainer />;

  return (
    <>
      <Head>
        <title>Active Tasks - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>{user?.is_superuser ? "All" : "My"} Active Tasks</h1>
        <span>
          Note: These tasks are grouped by their corresponding statuses
        </span>
        {tasks && taskList}
      </Container>
    </>
  );
};

export default ActiveTasksIndexPage;
