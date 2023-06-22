import Head from "next/head";
import useActiveTasks from "../../hooks/useActiveTasks";
import { Container } from "react-bootstrap";
import TaskList from "../../components/tasks/TaskList";

const ActiveTasksIndexPage = () => {
  const { tasks, isError, isLoading } = useActiveTasks();

  if (isError) return "Error";
  if (isLoading) return "Loading";

  return (
    <>
      <Head>
        <title>Active Tasks - Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <h1>My Active Tasks</h1>
        {tasks && <TaskList tasks={tasks} />}
      </Container>
    </>
  );
};

export default ActiveTasksIndexPage;
