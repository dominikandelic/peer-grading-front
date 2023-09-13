import { Container, Row, Col, Button } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { AiFillPlusCircle } from "react-icons/ai";
import useCourse from "../../hooks/useCourse";
import useCourseTasks from "../../hooks/useCourseTasks";
import useEnrolledStudents from "../../hooks/useEnrolledStudents";
import TeacherTaskList from "../tasks/TeacherTaskList";
import { UserResponse } from "../../api/generated";
import { CourseActionButtons } from "./CourseActionButtons";

type TeacherCourseContentProps = {
  user: UserResponse;
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
    mutate,
  } = useCourseTasks(Number(router.query.course_id));
  return (
    <>
      {(isError || isErrorStudent || isErrorTask) && <div>Pogreška</div>}
      {(isLoading || isLoadingStudent || isLoadingTask) && (
        <div>Učitavam...</div>
      )}
      {course && tasks && students && user && (
        <>
          <Row>
            <Col>Naziv: {course.name}</Col>
          </Row>
          <Col>
            Nastavnik: {course.teacher.first_name} {course.teacher.last_name}
          </Col>
          <Row>
            {(course.teacher!.id === user.id || user.is_superuser) && (
              <CourseActionButtons course={course} />
            )}
          </Row>
          <Row>
            <Col>
              {" "}
              <h3>
                Upisani studenti:{" "}
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
              <Col sm="2">
                <a
                  className="link"
                  key={student.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/profile/${student.id}`);
                  }}
                >
                  {student.first_name} {student.last_name}
                </a>
              </Col>
            ))}
          </Row>
          <Row>
            <h3>
              Zadaci:{" "}
              <AiFillPlusCircle
                className="plus-icon"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/courses/${course.id}/tasks/add`);
                }}
              />
            </h3>
          </Row>
          <TeacherTaskList
            isCourseTitleHidden
            mutateGrading={mutate}
            tasks={tasks}
          />
        </>
      )}
    </>
  );
};

export default TeacherCourseContent;
