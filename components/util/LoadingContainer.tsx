import { Container, Spinner } from "react-bootstrap";

export const LoadingContainer = () => {
  return (
    <Container>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
};
