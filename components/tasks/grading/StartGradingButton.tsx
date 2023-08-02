import { Axios, AxiosError } from "axios";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../env";

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
            `${BASE_URL}/api/tasks/${taskId}/grading-status`,
            {
              status: "STARTED",
            }
          );
          mutateGrading();
          toast.success("Ocjenjivanje započelo");
        } catch (e) {
          if (e instanceof AxiosError) {
            toast.error(e.message);
          }
        }
      }}
      variant="success"
    >
      Započni ocjenjivanje
    </Button>
  );
};
