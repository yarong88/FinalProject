const express = require("express");
// const history = require("connect-history-api-fallback");
// const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const logger = require("morgan");
// var cors = require("cors");
const app = express();
const port = 3000;
const { mongoose, UserData } = require("./mongoDB/mongoose.js"); // 몽고DB

// app.use(cors());
const _path = path.join(__dirname, "/dist");
console.log(_path);
// app.use(history());
app.use("/", express.static(_path));
app.use(logger("tiny"));
app.use(express.json()); // axios post로 받은 데이터 JSON 풀어주기

const dbSave = async function (dbData) {
  const _data = {
    userId: dbData.body.userId,
    userPassword: dbData.body.userPassword,
    contentText: dbData.body.contentText,
    contentImage: dbData.body.contentImage,
    writingTime: dbData.body.writingTime,
    ratingScore: dbData.body.ratingScore,
    recommendPoint: dbData.body.recommendPoint,
  };
  const new_data = new UserData(_data);
  const t = await new_data.save();
};

app.post("/userData", (req, res) => {
  dbSave(req).then(() => {
    res.send("저장이 완료되었습니다.");
  });
});

// db에서 데이터 불러오기
const dbLoad = async (id) => {
  const memo = await UserData.find({
    userId: id,
  }).lean();
  return memo;
};

app.post("/memoLoad", (req, res) => {
  dbLoad(req.body.userId).then((v) => {
    res.send(v);
  });
});

app.listen(port, () => {
  console.log(port + "에서 서버 동작 완료.");
});
