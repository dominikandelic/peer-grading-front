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
            Result
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
          Edit
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleShow();
          }}
          variant="danger"
        >
          Delete
        </Button>
      </ButtonGroup>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
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
                toast.success("Deleted task");
                router.push(`/tasks/`);
              } catch (e) {
                if (e instanceof AxiosError) {
                  toast.error(e.response?.data);
                }
              }
            }}
          >
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};
