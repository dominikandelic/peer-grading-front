import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SSRProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </SSRProvider>
    </>
  );
}
