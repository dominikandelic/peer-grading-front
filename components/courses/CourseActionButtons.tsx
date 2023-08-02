import router from "next/router";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { CourseResponse } from "../../api/generated";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import useAuthorizedAxios from "../../hooks/useAuthorizedAxios";
import { useState } from "react";
import { BASE_URL } from "../../env";

type CourseActionButtonsProps = {
  course: CourseResponse;
};

export const CourseActionButtons: React.FC<CourseActionButtonsProps> = ({
  course,
}) => {
  const { authorizedAxios } = useAuthorizedAxios();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ButtonGroup>
        <Button
          onClick={(e) => {
            e.preventDefault();
            router.push(`/courses/${course.id}/edit`);
          }}
          variant="primary"
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
          <Modal.Title>Obriši kolegij</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Jesi li siguran/na da želiš da obrisati ovaj kolegij?
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
                  `${BASE_URL}/api/courses/${course.id}`
                );
                handleClose();
                toast.success("Obrisan kolegij");
                router.push(`/courses/`);
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
    </>
  );
};
