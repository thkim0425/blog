import {
  POSTS_DETAIL_LOADING_FAILURE,
  POSTS_DETAIL_LOADING_REQUEST,
  POSTS_DETAIL_LOADING_SUCCESS,
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POSTS_UPLOADING_FAILURE,
  POSTS_UPLOADING_REQUEST,
  POSTS_UPLOADING_SUCCESS,
} from "../types";
import axios from "axios";
import { all, put, call, takeEvery, fork } from "redux-saga/effects";
import { push } from "connected-react-router";

// All Posts load

const loadPostAPI = () => {
  return axios.get("/api/post");
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log(result, "loadPosts");
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

// post upload

const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const token = payload.token;
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return axios.post("/api/post", payload, config);
};

function* uploadPosts(action) {
  try {
    console.log(action, "uploadPosts function");
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, "uploadPostAPI, action.payload");
    yield put({
      type: POSTS_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POSTS_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POSTS_UPLOADING_REQUEST, uploadPosts);
}

// post detail

const loadPostDetailAPI = (payload) => {
  return axios.get(`/api/post/${payload}`);
};

function* loadPostDetail(action) {
  try {
    const result = yield call(loadPostDetailAPI, action.payload);
    console.log(result, "post_detail_saga_data");
    yield put({
      type: POSTS_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
    //yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    console.log("post fail");
    yield put({
      type: POSTS_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push("/"));
  }
}

function* watchloadPostDetail() {
  yield takeEvery(POSTS_DETAIL_LOADING_REQUEST, loadPostDetail);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchuploadPosts),
    fork(watchloadPostDetail),
  ]);
}
