import { Axios, AxiosError } from "axios";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

type StartGradingButtonProps = {
  mutateGrading: () => void;
  authorizedAxios: Axios;
  taskId: number;
};

export const StartGradingButton = ({
  mutateGrading,
  authorizedAxios,
  taskId,
}: StartGradingButtonProps) => {
  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        try {
          await authorizedAxios.patch(
            `http://localhost:8000/api/tasks/${taskId}/grading-status`,
            {
              status: "STARTED",
            }
          );
          mutateGrading();
          toast.success("Grading started");
        } catch (e) {
          if (e instanceof AxiosError) {
            toast.error(e.message);
          }
        }
      }}
      variant="success"
    >
      Start grading
    </Button>
  );
};
