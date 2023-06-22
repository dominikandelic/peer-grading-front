import { useRouter } from "next/router";
import { Row } from "react-bootstrap";

const CourseList = ({ courses }) => {
  const router = useRouter();
  if (courses.length === 0) return <Row>No data</Row>;
  return courses.map((course) => {
    return (
      <a
        href="#"
        className="link-dark d-block"
        onClick={(e) => {
          e.preventDefault();
          router.push(`/courses/${course.id}`);
        }}
        key={course.id}
      >
        {course.name}
      </a>
    );
  });
};
export default CourseList;
