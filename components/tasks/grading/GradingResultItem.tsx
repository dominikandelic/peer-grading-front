import { url } from "inspector";
import { ListGroup, Badge } from "react-bootstrap";
import { GradingResultResponse } from "../../../api/generated";

type GradingResultItemProps = {
  result: GradingResultResponse;
  index: number;
};

export const GradingResultItem: React.FC<GradingResultItemProps> = ({
  result,
  index,
}) => {
  const url = `http://localhost:8000${result.submission.file.replace(
    "uploads/",
    ""
  )}`;
  return (
    <ListGroup.Item key={result.id}>
      <div className="d-flex justify-content-between align-items-center">
        <div>Submission #{index + 1}</div>
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
