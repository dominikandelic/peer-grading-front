import { useRouter } from "next/router";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { GradingStatus, TaskResponse } from "../../api/generated";
import { taskActionMapper } from "../../utils/grading/GradingStatusMapperUtil";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";

type StudentTaskButtonProps = {
  task: TaskResponse;
};

export const StudentTaskButton: React.FC<StudentTaskButtonProps> = ({
  task,
}) => {
  const { authorizedAxios } = useAuthorizedAxios();
  const router = useRouter();
  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        if (
          task.grading.status === GradingStatus.STANDBY ||
          task.grading.status === GradingStatus.STARTED
        ) {
          const hasSubmittedResponse = await authorizedAxios.get<boolean>(
            `http://127.0.0.1:8000/api/tasks/${task.id}/student/has-submitted`
          );
          const hasAlreadySubmitted = hasSubmittedResponse.data;
          // STANDBY
          if (task.grading.status === GradingStatus.STANDBY) {
            if (hasAlreadySubmitted) {
              router.push(
                `/courses/${task.course.id}/tasks/${task.id}/submissions/own`
              );
            } else {
              router.push(
                `/courses/${task.course.id}/tasks/${task.id}/submissions/add`
              );
            }
            // STARTED
          } else {
            const hasAlreadyGradedResponse = await authorizedAxios.get<boolean>(
              `http://127.0.0.1:8000/api/grading/${task.id}/has-graded`
            );
            const hasAlreadyGraded = hasAlreadyGradedResponse.data;
            if (hasAlreadyGraded) {
              toast.info(
                "Već si ocijenio/la radove za ovaj zadatak. Molimo, sačekaj rezultate"
              );
            } else if (!hasAlreadySubmitted) {
              toast.info(
                "Ne možeš ocjenjivati zadatke jer nisi predao/la vlastito rješenje"
              );
            } else {
              router.push(`/grading/${task.id}`);
            }
          }
          // FINISHED
        } else {
          router.push(`/grading/result/${task.id}`);
        }
      }}
      variant="primary"
    >
      {taskActionMapper.get(task.grading.status)}
    </Button>
  );
};
