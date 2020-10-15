import React from "react";
import { Row, Col } from "reactstrap";
const Header = () => {
  return (
    <div id="page-header" className="mb-3">
      <Row>
        <Col md="6" sm="auto" className="text-center m-auto">
          <h1>Taehoon's Blog</h1>
          <p>안녕하세요 반갑습니다:)</p>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
