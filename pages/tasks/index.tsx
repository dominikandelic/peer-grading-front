import Head from "next/head";
import useActiveTasks from "../../hooks/useActiveTasks";
import { Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";

const ActiveTasksIndexPage = () => {
  const router = useRouter();
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
        {tasks &&
          tasks.map((task) => {
            return (
              <Row key={task.id}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(
                      `/courses/${task.course.id}/tasks/${task.id}/submissions/add`
                    );
                  }}
                  href=""
                >
                  {task.name} - course {task.course.name}
                </a>{" "}
              </Row>
            );
          })}
      </Container>
    </>
  );
};

export default ActiveTasksIndexPage;
