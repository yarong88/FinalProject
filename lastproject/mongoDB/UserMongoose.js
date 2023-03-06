require("dotenv").config();
const mongoose = require("mongoose");
const UserData = require("./UserSchema.js");

const USER = process.env.dbid;
const PWD = process.env.dbpw;
const HOST = process.env.dbhost;
const DB = "MemoProject";
const mongodbURL = `mongodb://${USER}:${PWD}@${HOST}/${DB}`;

// mongoose.set('useFindAndModify', false);    //6.0이후부터는 자동관리
mongoose.set(`strictQuery`, false); //6.0이후 권장사항
mongoose
  .connect(mongodbURL, { useNewUrlParser: true })
  .then(() => console.log("connection succesful"))
  .catch((err) => console.log(err));

module.exports = UserData;
