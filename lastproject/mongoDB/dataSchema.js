const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  userId: String,
  userPassword: String,
  contentText: Array,
  contentImage: String,
  writingTime: String,
  ratingScore: Number,
  recommendPoint: Number,
});

module.exports = mongoose.model("UserData", DataSchema, "UserData");
// module.exports = mongoose.model('Photo', PhotoSchema, 'Photo')
// 'Photo'가 'Photos'로 바뀌는 것을 막는다.
