import { Container, Row, Col, Button } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillPlusCircle } from "react-icons/ai";
import useCourse from "../../hooks/useCourse";
import useCourseTasks from "../../hooks/useCourseTasks";
import useEnrolledStudents from "../../hooks/useEnrolledStudents";
import TeacherTaskList from "../tasks/TeacherTaskList";
import { UserResponse } from "../../api/generated";
import useStore from "../../hooks/useStore";
import { useAuthStore } from "../../stores/authStore";

type TeacherCourseContentProps = {
  user: any;
};

const TeacherCourseContent = ({ user }: TeacherCourseContentProps) => {
  const router = useRouter();
  const userId = useStore(useAuthStore, (store) => store.user?.id);
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
          <Col>
            Teacher: {course.teacher.first_name} {course.teacher.last_name}
          </Col>
          <Row>
            {course.teacher!.id === userId && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/courses/${course.id}/edit`);
                }}
                variant="primary"
              >
                Edit
              </Button>
            )}
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
            {students.map((student: UserResponse) => (
              <a
                key={student.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/profile/${student.id}`);
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
          <TeacherTaskList tasks={tasks} />
        </>
      )}
    </>
  );
};

export default TeacherCourseContent;
