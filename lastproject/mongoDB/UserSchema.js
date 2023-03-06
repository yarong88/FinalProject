const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: String,
  user_pwd: String,
  user_nickname: String,
  user_email: String,

  birth: String,
  gender: String,
  hobby: String,
  // id: Number,
  create_date: { type: Date, default: Date.now },
});

// model을 user로 만들면 특별한 이름을 지정하지 않으면
// mongoDB에서 알아서 Collection name을 알아서 복수형으로 해줍니다
// 그리하여 Collection name은 users로 됩니다
module.exports = mongoose.model("UserData", userSchema, "UserData");
