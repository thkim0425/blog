import React, { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import {
  POSTS_DETAIL_LOADING_REQUEST,
  POSTS_DELETE_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
import { Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import CKEditor from "@ckeditor/ckeditor5-react";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faCommentDots,
  faMouse,
} from "@fortawesome/free-solid-svg-icons";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";

const PostDetail = (req) => {
  console.log(req, "post detail.........");
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);

  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );

  console.log(req, "PostDetail.js req");
  useEffect(() => {
    console.log("post detail loading request");
    dispatch({
      type: POSTS_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });

    console.log(req.match.params.id);

    console.log("user loading request");
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch, req.match.params.id]);

  const onDeleteClick = () => {
    dispatch({
      type: POSTS_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const EditButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-md-3 mr-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
        <Col className="col-md-3 mr-md-3">
          <Link
            to={`/post/${req.match.params.id}/edit`}
            className="btn btn-success btn-block"
          >
            Edit Post
          </Link>
        </Col>
        <Col className="col-md-3">
          <Button className="btn-block btn-danger" onClick={onDeleteClick}>
            Delete
          </Button>
        </Col>
      </Row>
    </Fragment>
  );

  const HomeButton = (
    <Fragment>
      <Row className="d-flex justify-content-center pb-3">
        <Col className="col-sm-12 com-md-3">
          <Link to="/" className="btn btn-primary btn-block">
            Home
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
  console.log(userId, "userId");
  console.log(creatorId, "creatorId");
  console.log(postDetail, "postDetail");
  console.log(title, "title");
  console.log(loading, "loading");

  //{userId === creatorId ? EditButton : HomeButton}
  const Body = (
    <>
      {userId === creatorId ? EditButton : HomeButton}
      <Row className="border-bottom border-top border-primary p-3 mb-3 justify-content-between">
        {(() => {
          if (postDetail && postDetail.creator) {
            return (
              <Fragment>
                <div className="font-weight-bold text-big">
                  <span className="mr-3">
                    <Button color="info">
                      {postDetail.category.categoryName}
                    </Button>
                  </span>
                  {postDetail.title}
                </div>
                <div className="align-self-end">{postDetail.creator.name}</div>
              </Fragment>
            );
          }
        })()}
      </Row>
      {postDetail ? (
        <Fragment>
          <div className="d-flex justify-content-end align-items-baseline small">
            <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
            &nbsp;
            <span>{postDetail.date}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faCommentDots}></FontAwesomeIcon>
            &nbsp;
            <span>{postDetail.comments.length}</span>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faMouse}></FontAwesomeIcon>
            <span>{postDetail.views}</span>
          </div>
          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            ></CKEditor>
          </Row>
        </Fragment>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );

  debugger;

  return (
    <div>
      <Helmet title={`Post | ${title}`} />
      {loading === true ? GrowingSpinner : Body}
    </div>
  );
};

export default PostDetail;
