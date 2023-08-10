import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { useAuthStore } from "../stores/authStore";
import { NavDropdown } from "react-bootstrap";
import { NextRouter, useRouter } from "next/router";
import { toast } from "react-toastify";
import useStore from "../hooks/useStore";
import { mutate } from "swr";

const LoggedInLinks = ({ router }: { router: NextRouter }) => {
  const { set, user } = useAuthStore();

  return (
    <>
      {!user?.is_student && (
        <Link href="/courses" passHref legacyBehavior>
          <Nav.Link active={router.pathname == "/courses"}>
            Svi kolegiji
          </Nav.Link>
        </Link>
      )}
      {!user?.is_superuser && (
        <Link href="/courses/my" passHref legacyBehavior>
          <Nav.Link active={router.pathname == "/courses/my"}>
            Moji kolegiji
          </Nav.Link>
        </Link>
      )}

      <Link href="/tasks" passHref legacyBehavior>
        <Nav.Link active={router.pathname == "/tasks"}>Zadaci</Nav.Link>
      </Link>
      <NavDropdown active={router.pathname == "/profile"} title="Profil">
        <Link href="/profile" passHref legacyBehavior>
          <NavDropdown.Item>Detalji</NavDropdown.Item>
        </Link>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={async (e) => {
            mutate(/* match all keys */ () => true, undefined, false);
            set({ accessToken: "", refreshToken: "", username: "" });
            toast.success("Uspjeh");
            router.push("/");
          }}
        >
          Odjava
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

const PublicLinks = ({ router }: { router: NextRouter }) => {
  return (
    <>
      <Link href="/login" passHref legacyBehavior>
        <Nav.Link active={router.pathname == "/login"}>Prijava</Nav.Link>
      </Link>
      <NavDropdown title="Registracija">
        <Link href="/register/student" passHref legacyBehavior>
          <NavDropdown.Item active={router.pathname == "/register/student"}>
            Student
          </NavDropdown.Item>
        </Link>
        <Link href="/register/teacher" passHref legacyBehavior>
          <NavDropdown.Item active={router.pathname == "/register/teacher"}>
            Profesor
          </NavDropdown.Item>
        </Link>
      </NavDropdown>
    </>
  );
};

const Navigation = () => {
  const user = useStore(useAuthStore, (state) => state.user);

  const router = useRouter();
  return (
    <Navbar sticky="top" bg="dark" variant="dark">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>PeerGrader</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              <LoggedInLinks router={router} />
            ) : (
              <PublicLinks router={router} />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
