import { Axios, AxiosError } from "axios";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../env";

type FinishGradingButtonProps = {
  mutateGrading: () => void;
  authorizedAxios: Axios;
  taskId: number;
};

export const FinishGradingButton = ({
  mutateGrading,
  authorizedAxios,
  taskId,
}: FinishGradingButtonProps) => {
  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        try {
          await authorizedAxios.patch(
            `${BASE_URL}/api/tasks/${taskId}/grading-status`,
            {
              status: "FINISHED",
            }
          );
          mutateGrading();
          toast.success("Ocjenjivanje završeno");
        } catch (e) {
          if (e instanceof AxiosError) {
            toast.error(e.message);
          }
        }
      }}
      variant="success"
    >
      Završi ocjenjivanje - pokaži rezultate
    </Button>
  );
};
