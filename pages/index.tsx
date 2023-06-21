import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import Navigation from "../components/Navbar";
import Image from "next/image";
import grades from "../public/grades.svg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="mt-5">
          <Col className="d-flex align-items-center">
            <h1>Peer Grading made easy and fun!</h1>
          </Col>
          <Col>
            <Image alt="Depiction of student grading" src={grades} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
