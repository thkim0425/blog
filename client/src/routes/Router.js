import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";

const MyRouter = () => {
  return (
    <React.Fragment>
      <AppNavbar></AppNavbar>
      <Header></Header>
      <h1>Hello Body</h1>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default MyRouter;
