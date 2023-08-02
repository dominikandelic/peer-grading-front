import router from "next/router";
import { Row, ButtonGroup, Button, Modal } from "react-bootstrap";
import { FinishGradingButton } from "./grading/FinishGradingButton";
import { StartGradingButton } from "./grading/StartGradingButton";
import { TaskResponse, UserResponse } from "../../api/generated";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../env";

type TaskActionButtonsProps = {
  task: TaskResponse;
  mutateGrading: () => void;
  user: UserResponse;
};

export const TaskActionButtons = ({
  task,
  mutateGrading,
  user,
}: TaskActionButtonsProps) => {
  const { authorizedAxios } = useAuthorizedAxios();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row>
      <ButtonGroup size="sm">
        {task.grading.status == "STARTED" ? (
          <FinishGradingButton
            mutateGrading={mutateGrading}
            authorizedAxios={authorizedAxios}
            taskId={task.id}
          />
        ) : task.grading.status == "FINISHED" ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              router.push(`/grading/result/${task.id}`);
            }}
            variant="primary"
          >
            Rezultat
          </Button>
        ) : (
          <StartGradingButton
            mutateGrading={mutateGrading}
            authorizedAxios={authorizedAxios}
            taskId={task.id}
          />
        )}
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.push(`/courses/${task.course.id}/tasks/${task.id}`);
          }}
          variant="warning"
        >
          Uredi
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleShow();
          }}
          variant="danger"
        >
          Obriši
        </Button>
      </ButtonGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Obriši zadatak</Modal.Title>
        </Modal.Header>
        <Modal.Body>Jesi li siguran/na da želiš obrisati zadatak?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Zatvori
          </Button>
          <Button
            variant="danger"
            onClick={async (e) => {
              e.preventDefault();
              try {
                await authorizedAxios.delete(
                  `${BASE_URL}/api/tasks/${task.id}`
                );
                handleClose();
                toast.success("Zadatak obrisan");
                router.push(`/tasks/`);
              } catch (e) {
                if (e instanceof AxiosError) {
                  toast.error(e.response?.data);
                }
              }
            }}
          >
            Da, obriši
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};
