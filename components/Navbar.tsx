import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { useAuthStore } from "../stores/authStore";
import { NavDropdown } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoggedInLinks = () => {
  const router = useRouter();
  const { set } = useAuthStore();
  return (
    <>
      <Link href="/courses" passHref legacyBehavior>
        <Nav.Link>Courses</Nav.Link>
      </Link>
      <Link href="/tasks" passHref legacyBehavior>
        <Nav.Link>Tasks</Nav.Link>
      </Link>
      <NavDropdown title="Profile">
        <Link href="/profile" passHref legacyBehavior>
          <NavDropdown.Item>Details</NavDropdown.Item>
        </Link>
        <NavDropdown.Divider />

        <NavDropdown.Item
          onClick={(e) => {
            e.preventDefault();
            set({ accessToken: "", refreshToken: "", username: "" });
            toast.success("Success");
            router.push("/");
          }}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

const PublicLinks = () => {
  return (
    <>
      <Link href="/login" passHref legacyBehavior>
        <Nav.Link>Login</Nav.Link>
      </Link>
      <Link href="/register" passHref legacyBehavior>
        <Nav.Link>Register</Nav.Link>
      </Link>
    </>
  );
};

const Navigation = () => {
  const { username } = useAuthStore();
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Peer Grading</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {username ? <LoggedInLinks /> : <PublicLinks />}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
