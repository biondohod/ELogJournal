import React from "react";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
