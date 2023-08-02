import { useState } from "react";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { Button, ButtonGroup, Modal, Row } from "react-bootstrap";
import { AxiosError } from "axios";
import router from "next/router";
import { toast } from "react-toastify";
import { UserResponse } from "../../api/generated";
import { useAuthStore } from "../../stores/authStore";
import { BASE_URL } from "../../env";

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

  const DELETION_MESSAGE =
    loggedInUser?.id === user.id ? "svoj profil" : "ovog korisnika";

  return (
    <Row>
      <ButtonGroup>
        {(loggedInUser!.id === user.id || loggedInUser?.is_superuser) && (
          <Button variant="primary" type="submit">
            Podnesi
          </Button>
        )}
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
          <Modal.Title>Obriši {DELETION_MESSAGE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jesi li siguran/na da želiš obrisati {DELETION_MESSAGE}?
        </Modal.Body>
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
                  `${BASE_URL}/api/users/${user.id}`
                );
                handleClose();
                toast.success("Obrisan korisnik");
                router.push(`/`);
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
