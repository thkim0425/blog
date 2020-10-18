import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import Search from "./normalRoute/Search";
import CategoryResult from "./normalRoute/CategoryResult";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

const MyRouter = () => {
  return (
    <React.Fragment>
      <AppNavbar></AppNavbar>
      <Header></Header>
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={PostCardList}></Route>
          <Route path="/post" exact component={PostWrite}></Route>
          <Route path="/post/:id" exact component={PostDetail}></Route>
          <Route path="/search/:searchTerm" exact component={Search}></Route>
          <Route
            path="/post/category/:categoryName"
            exact
            component={CategoryResult}
          ></Route>
          <Redirect from="*" to="/"></Redirect>
        </Switch>
      </Container>
      <Footer></Footer>
    </React.Fragment>
  );
};

export default MyRouter;
