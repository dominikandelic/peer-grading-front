import { useRouter } from "next/router";
import { Button, Card, Row } from "react-bootstrap";
import useStore from "../../hooks/useStore";
import { useAuthStore } from "../../stores/authStore";
import { CourseResponse } from "../../api/generated";

type CourseListProps = {
  courses: CourseResponse[];
};

const CourseList = ({ courses }: CourseListProps) => {
  const router = useRouter();
  const userId = useStore(useAuthStore, (store) => store.user?.id);
  if (courses.length === 0) return <Row>No data</Row>;
  return (
    <Row>
      {courses.map((course: CourseResponse) => {
        return (
          <a
            href="#"
            style={{ width: "18rem" }}
            className="link-dark m-2 p-0"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/courses/${course.id}`);
            }}
            key={course.id}
          >
            <Card className="">
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>
                  Teacher:{" "}
                  {course.teacher &&
                    `${course.teacher.first_name} ${course.teacher.last_name}`}
                </Card.Text>
                {course.teacher!.id === userId && (
                  <Button variant="primary">Edit</Button>
                )}
              </Card.Body>
            </Card>
          </a>
        );
      })}
    </Row>
  );
};
export default CourseList;
