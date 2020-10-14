import mongoose, { mongo } from "mongoose";
import moment from "moment";

const CommentSchema = new mongoose.Schema({
  contents: {
    type: String,
    required: true, //내용이 없는 댓글은 허용하지 않음.
  },
  date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  creatorName: { type: String }, //작성자 이름 따로만들어서 데이터베이스 부담낮춤.
});

const Comment = mongoose.model("comment", CommentSchema);

export default Comment;
