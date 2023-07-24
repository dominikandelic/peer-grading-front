import { useState } from "react";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { Button, ButtonGroup, Modal, Row } from "react-bootstrap";
import { AxiosError } from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import { UserResponse } from "../../api/generated";
import { useAuthStore } from "../../stores/authStore";

type ProfileActionButtonsProps = {
  user: UserResponse;
};

export const ProfileActionButtons: React.FC<ProfileActionButtonsProps> = ({
  user,
}) => {
  const { authorizedAxios } = useAuthorizedAxios();
  const [show, setShow] = useState(false);
  const loggedInUser = useAuthStore((store) => store.user);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const DELETION_MESSAGE = loggedInUser === user ? "your profile" : "this user";

  return (
    <Row>
      <ButtonGroup>
        {(loggedInUser === user || loggedInUser?.is_superuser) && (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
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
          <Modal.Title>Delete {DELETION_MESSAGE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {DELETION_MESSAGE}?
        </Modal.Body>
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
                  `http://localhost:8000/api/users/${user.id}`
                );
                handleClose();
                toast.success("Deleted user");
                router.push(`/`);
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
