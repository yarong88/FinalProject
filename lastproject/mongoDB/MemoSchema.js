const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  userId: String,
  userNickname: String,
  contentText: Array,
  contentLongText: String,
  contentImage: String,
  writingTime: String,
  ratingScore: Number,
  recommendPoint: Number,
  likeIdList: Array,
  bookmarkIdList: Array,
  commentList: Array,
  agreeToShare: Number,
  mobilenetResult: String,
});

module.exports = mongoose.model("MemoData", DataSchema, "MemoData");
// module.exports = mongoose.model('Photo', PhotoSchema, 'Photo')
// 'Photo'가 'Photos'로 바뀌는 것을 막는다.
