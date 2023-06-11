import { ReactNode } from "react";
import Navigation from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}
