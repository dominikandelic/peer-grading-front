import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillPlusCircle } from "react-icons/ai";
import useCourse from "../../hooks/useCourse";
import useCourseTasks from "../../hooks/useCourseTasks";
import useEnrolledStudents from "../../hooks/useEnrolledStudents";

type TeacherCourseContentProps = {
  user: any;
};

const TeacherCourseContent = ({ user }: TeacherCourseContentProps) => {
  const router = useRouter();
  const { course, isError, isLoading } = useCourse(
    Number(router.query.course_id)
  );
  const {
    students,
    isError: isErrorStudent,
    isLoading: isLoadingStudent,
  } = useEnrolledStudents(Number(router.query.course_id));
  const {
    tasks,
    isError: isErrorTask,
    isLoading: isLoadingTask,
  } = useCourseTasks(Number(router.query.course_id));
  return (
    <>
      {(isError || isErrorStudent || isErrorTask) && <div>Error</div>}
      {(isLoading || isLoadingStudent || isLoadingTask) && (
        <div>Loading...</div>
      )}
      {course && tasks && students && user && (
        <>
          <Row>
            <Col>Name: {course.name}</Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <h3>
                Enrolled students:{" "}
                <AiFillPlusCircle
                  className="plus-icon"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/courses/${course.id}/enroll_students`);
                  }}
                />
              </h3>
            </Col>
          </Row>
          <Row>
            {students.map((student) => (
              <a
                key={student.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/students/${student.id}`);
                }}
              >
                {student.first_name} {student.last_name}
              </a>
            ))}{" "}
          </Row>
          <Row>
            <h3>
              Tasks:{" "}
              <AiFillPlusCircle
                className="plus-icon"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/courses/${course.id}/tasks/add`);
                }}
              />
            </h3>
          </Row>
          {tasks.map((task) => (
            <Row key={task.id}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(
                    `/courses/${course.id}/tasks/${task.id}/submissions`
                  );
                }}
              >
                {task.name}
              </a>
            </Row>
          ))}
        </>
      )}
    </>
  );
};

export default TeacherCourseContent;
