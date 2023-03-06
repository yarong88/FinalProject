const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: String,
  user_pwd: String,
  user_nickname: String,
  user_email: String,

  //마이페이지 추가 정보 입력
  profile_img: String,
  birth: String,    //20000423  2000.04.23  000423
  gender: String,   //라디오버튼
  hobby: String,    //셀렉트

  create_date: { type: Date, default: Date.now },
});

// model을 user로 만들면 특별한 이름을 지정하지 않으면
// mongoDB에서 알아서 Collection name을 알아서 복수형으로 해줍니다
// 그리하여 Collection name은 users로 됩니다
module.exports = mongoose.model("UserData", userSchema, "UserData");
