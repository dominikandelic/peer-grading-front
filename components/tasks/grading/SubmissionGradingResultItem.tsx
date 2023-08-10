import { ListGroup, Badge } from "react-bootstrap";
import Link from "next/link";
import { SubmissionGradeResponse } from "../../../api/generated";
import { BASE_URL } from "../../../env";
import { useAuthStore } from "../../../stores/authStore";

type SubmissionGradingResultItemProps = {
  submissionGrade: SubmissionGradeResponse;
  index: number;
};

export const SubmissionGradingResultItem: React.FC<
  SubmissionGradingResultItemProps
> = ({ submissionGrade, index }) => {
  const user = useAuthStore((store) => store.user);

  return (
    <ListGroup.Item key={submissionGrade.id}>
      <div className="d-flex justify-content-between align-items-center">
        <div>Ocjenjivač #{index + 1}</div>
        {user?.is_teacher && (
          <div>
            Ocijenio:{" "}
            <Link href={`/profile/${submissionGrade.grader.id}`}>
              {submissionGrade.grader.first_name}{" "}
              {submissionGrade.grader.last_name}
            </Link>
          </div>
        )}
        <div>
          Ocjena:{" "}
          <Badge pill bg="primary">
            {submissionGrade.grade}
          </Badge>
        </div>
      </div>
    </ListGroup.Item>
  );
};
