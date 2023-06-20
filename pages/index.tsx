import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import Navigation from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Peer Grading</title>
        <meta name="description" content="Peer grading meta desc..." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Home</h1>
    </>
  );
}
