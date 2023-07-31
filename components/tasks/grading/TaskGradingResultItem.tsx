import { ListGroup, Badge } from "react-bootstrap";
import { GradingResultResponse } from "../../../api/generated";
import Link from "next/link";
import { BASE_URL } from "../../../env";

type TaskGradingResultItemProps = {
  result: GradingResultResponse;
  index: number;
};

export const TaskGradingResultItem: React.FC<TaskGradingResultItemProps> = ({
  result,
  index,
}) => {
  const url = `${BASE_URL}${result.submission.file.replace("uploads/", "")}`;
  return (
    <ListGroup.Item key={result.id}>
      <div className="d-flex justify-content-between align-items-center">
        <div>Submission #{index + 1}</div>
        <Link href={`/grading/result/submissions/${result.submission.id}`}>
          Gradings
        </Link>
        <a target="_blank" href={url}>
          View submission
        </a>
        <div>
          Submitted by: {result.submission.student.first_name}{" "}
          {result.submission.student.last_name}
        </div>
        <Badge pill bg="primary">
          {result.total_score}
        </Badge>
      </div>
    </ListGroup.Item>
  );
};
