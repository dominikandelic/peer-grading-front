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
        <title>PeerGrader</title>
        <meta name="description" content="PeerGrader meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Row className="mt-5">
          <Col className="d-flex align-items-center">
            <h1>Istorazinsko ocjenjivanje na jednostavan i efikasan način!</h1>
          </Col>
          <Col>
            <Image alt="Depiction of student grading" src={grades} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
