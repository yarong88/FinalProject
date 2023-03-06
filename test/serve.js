const express = require('express')
const history = require('connect-history-api-fallback')
// const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require('path')
const logger = require('morgan')
const app = express()
const port = 3000
const MemoData = require('./mongoDB/MemoMongoose.js') // 메모 DB
const UserData = require('./mongoDB/UserMongoose.js') // 유저 DB

const _path = path.join(__dirname, '/dist')
console.log(_path)
app.use(history())
app.use('/', express.static(_path))
app.use(logger('tiny'))
// app.use(express.json()); // axios post로 받은 데이터 JSON 풀어주기
// 기본값으로는 json파서와 urlencoded 파서는 100kb만 파싱 할 수 있도록 설정
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ limit: '100mb', extended: false }))

// db에 유저데이터 저장
app.post('/SignUp', (req, res) => {
  // Sign Up
  // Post로만 받는다
  // const crypto_key = req.body.user_pwd;

  // crypto.randomBytes(64, (err, buf) => {
  // 암호화
  // crypto.pbkdf2(crypto_key, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
  //     const hash = key.toString('base64');
  //     console.log(hash)

  // 복호화(hash === hash2가 true) ===>> 로그인할때 비밀번호 확인
  // crypto.pbkdf2(crypto_key, buf.toString('base64'), 100000, 64, 'sha512', (err2, key2) => {
  //     const hash2 = key2.toString('base64')
  //     console.log(hash === hash2)
  // });

  const user_save = async () => {
    const _data = {
      user_id: req.body.user_id,
      user_pwd: req.body.user_pwd, // hash
      user_nickname: req.body.user_nickname,
      user_email: req.body.user_email

      // birth: '',
      // gender: '',
      // hobby: ''
    }
    const new_user = new UserData(_data)
    const t = await new_user.save()
    console.log(t)
    res.send('회원가입성공')
  }
  user_save()
  // });
  // });
})

app.get('/SignIn/SignUp/idc/:user_id', (req, res) => {
  console.log(req.params)
  const user_id = req.params.user_id
  console.log(user_id)
  const id_find = async () => {
    const t = await UserData.find(
      { user_id: { $eq: user_id } },
      { _id: 0, __v: 0 }
    ).lean()
    if (t.length === 0) {
      console.log('id 사용가능')
      res.send('가능')
    } else {
      console.log('id 사용불가 - 중복')
      res.send('불가')
    }
    // console.log(t)
  }
  id_find()
})
app.get('/SignIn/SignUp/nickc/:user_nickname', (req, res) => {
  const user_nickname = req.params.user_nickname
  console.log(user_nickname)
  const nick_find = async () => {
    const t = await UserData.find({ user_nickname }, { _id: 0, __v: 0 }).lean()
    if (t.length === 0) {
      console.log('닉네임 사용가능')
      res.send('가능')
    } else {
      console.log('닉네임 사용불가 - 중복')
      res.send('불가')
    }
    // console.log(t)
  }
  nick_find()
})
app.get('/SignIn/SignUp/emailc/:user_email', (req, res) => {
  const user_email = req.params.user_email
  console.log(user_email)
  const email_find = async () => {
    const t = await UserData.find({ user_email }, { _id: 0, __v: 0 }).lean()
    if (t.length === 0) {
      console.log('이메일 사용가능')
      res.send('가능')
    } else {
      console.log('이메일 사용불가 - 중복')
      res.send('중복')
    }
    // console.log(t)
  }
  email_find()
})

app.get('/SignIn/:user_id:user_pwd', (req, res) => {
  const user_id = req.params.user_id
  const user_pwd = req.params.user_pwd
  // console.log(user_id)
  // console.log(user_pwd)

  const read = async () => {
    const t = await UserData.find({ user_id, user_pwd }, { _id: 0, __v: 0 })
      .lean()
      .then((t) => {
        // console.log(t)
        res.send(t)
      })
  }
  read()
})

app.post('/SignIn', (req, res) => {
  const user_id = req.body.user_id
  const user_pwd = req.body.user_pwd
  const id_find = async () => {
    const t = await UserData.find({ user_id }, { _id: 0, __v: 0 }).lean()
    return t
  }
  id_find().then(v => {
    console.log(v)
    if (v[0] == undefined) {
      console.log(v)
      console.log(v[0])
      res.send('wrong_id')
    } else {
      if (user_pwd === v[0].user_pwd) {
        res.send('login_success')
      } else {
        res.send('wrong_pwd')
      }
    }
  })
})

// db에 메모 저장
app.post('/memoSave', (req, res) => {
  const _data = {
    userId: req.body.userId,
    userPassword: req.body.userPassword,
    contentText: req.body.contentText,
    contentLongText: req.body.contentLongText,
    contentImage: req.body.contentImage,
    writingTime: req.body.writingTime,
    ratingScore: req.body.ratingScore,
    recommendPoint: req.body.recommendPoint
  };
  (async () => {
    const new_data = new MemoData(_data)
    const t = await new_data.save()
    // console.log(t);
    res.send('저장이 완료되었습니다.')
  })()
})

// db에 메모 업데이트
app.post('/memoUpdate', (req, res) => {
  console.log(req.body._id);
  (async () => {
    const t = await MemoData.updateOne(
      {
        _id: req.body._id
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
          recommendPoint: req.body.recommendPoint
        }
      },
      { upsert: true }
    )
    // console.log(t);
    res.send('수정완료')
  })()
})

// db에서 아이디별로 모든 메모 데이터 불러오기
app.post('/memoLoad', (req, res) => {
  const usetId = req.body.userId;
  (async () => {
    const memo = await MemoData.find({
      userId: usetId
    }).lean()
    return memo
  })().then((v) => {
    res.send(v)
  })
})

// db에 메모 데이터 지우기
app.get('/memoDelete/:_id', (req, res) => {
  const data = req.params._id
  const t = MemoData.deleteOne({ _id: { $eq: data } }).then((t) => {
    res.send('삭제완료')
    console.log(t)
  })
})

// db에서 특정 키워드로 메모 데이터 불러오기
app.post('/memoSearch', (req, res) => {
  const keyWord = req.body.keyWord;
  (async () => {
    const memo = await MemoData.find({
      contentText: { $in: keyWord }
    }).lean()
    return memo
  })().then((v) => {
    res.send(v)
  })
})

app.listen(port, () => {
  console.log(port + '에서 서버 동작 완료.')
})
