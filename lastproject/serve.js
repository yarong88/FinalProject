const express = require("express");
const history = require("connect-history-api-fallback");
// const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");
const logger = require("morgan");

const app = express();
const port = 3000;
const UserData = require("./mongoDB/mongoose.js"); // 몽고DB

const _path = path.join(__dirname, "/dist");
console.log(_path);
app.use(history());
app.use("/", express.static(_path));
app.use(logger("tiny"));
// app.use(express.json()); // axios post로 받은 데이터 JSON 풀어주기
// 기본값으로는 json파서와 urlencoded 파서는 100kb만 파싱 할 수 있도록 설정
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: false }));

// db에 저장
app.post("/memoSave", (req, res) => {
  const _data = {
    userId: req.body.userId,
    userPassword: req.body.userPassword,
    contentText: req.body.contentText,
    contentLongText: req.body.contentLongText,
    contentImage: req.body.contentImage,
    writingTime: req.body.writingTime,
    ratingScore: req.body.ratingScore,
    recommendPoint: req.body.recommendPoint,
  };
  (async () => {
    const new_data = new UserData(_data);
    const t = await new_data.save();
    // console.log(t);
    res.send("저장이 완료되었습니다.");
  })();
});

// db에 업데이트
app.post("/memoUpdate", (req, res) => {
  console.log(req.body._id);
  (async () => {
    const t = await UserData.updateOne(
      {
        _id: req.body._id,
      },
      {
        $set: {
          userId: req.body.userId,
          userPassword: req.body.userPassword,
          contentText: req.body.contentText,
          contentLongText: req.body.contentLongText,
          contentImage: req.body.contentImage,
          writingTime: req.body.writingTime,
          ratingScore: req.body.ratingScore,
          recommendPoint: req.body.recommendPoint,
        },
      },
      { upsert: true }
    );
    // console.log(t);
    res.send("수정완료");
  })();
});

// db에서 데이터 불러오기
app.post("/memoLoad", (req, res) => {
  const usetId = req.body.userId;
  (async () => {
    const memo = await UserData.find({
      userId: usetId,
    }).lean();
    return memo;
  })().then((v) => {
    res.send(v);
  });
});

// db에 데이터 지우기
app.get("/memoDelete/:_id", (req, res) => {
  const data = req.params._id;
  const t = UserData.deleteOne({ _id: { $eq: data } }).then((t) => {
    res.send("삭제완료");
    console.log(t);
  });
});

// db에서 데이터 찾기
app.post("/memoSearch", (req, res) => {
  const keyWord = req.body.keyWord;
  (async () => {
    const memo = await UserData.find({
      contentText: { $in: keyWord },
    }).lean();
    return memo;
  })().then((v) => {
    res.send(v);
  });
});

app.listen(port, () => {
  console.log(port + "에서 서버 동작 완료.");
});
