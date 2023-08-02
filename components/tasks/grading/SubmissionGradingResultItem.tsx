import { ListGroup, Badge } from "react-bootstrap";
import Link from "next/link";
import { SubmissionGradeResponse } from "../../../api/generated";
import { BASE_URL } from "../../../env";

type SubmissionGradingResultItemProps = {
  submissionGrade: SubmissionGradeResponse;
  index: number;
};

export const SubmissionGradingResultItem: React.FC<
  SubmissionGradingResultItemProps
> = ({ submissionGrade, index }) => {
  const url = `${BASE_URL}${submissionGrade.submission.file.replace(
    "uploads/",
    ""
  )}`;
  return (
    <ListGroup.Item key={submissionGrade.id}>
      <div className="d-flex justify-content-between align-items-center">
        <div>Ocjenjivač #{index + 1}</div>
        <Badge pill bg="primary">
          {submissionGrade.grade}
        </Badge>
      </div>
    </ListGroup.Item>
  );
};
