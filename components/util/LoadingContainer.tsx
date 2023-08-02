import { Container, Spinner } from "react-bootstrap";

export const LoadingContainer = () => {
  return (
    <Container>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Učitavam...</span>
      </Spinner>
    </Container>
  );
};
