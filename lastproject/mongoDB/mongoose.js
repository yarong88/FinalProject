require("dotenv").config();
const mongoose = require("mongoose");
const USER = "memoProject";
const PWD = 12345;
const HOST = "127.0.0.1:27017";
const DB = "MemoProject";
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`;
// mongoose.set('useFindAndModify', false)
// 6.0버전 이후로 자동관리되므로 삭제
mongoose.set("strictQuery", false);
// 6.0버전 이후 권장사항
mongoose
  .connect(mongodbURL, { useNewUrlParser: true })
  .then(() => console.log("connection succesful"))
  .catch((err) => console.error(err));
const UserData = require("./dataSchema.js");
module.exports = { mongoose, UserData };
