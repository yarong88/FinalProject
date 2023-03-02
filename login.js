require('dotenv').config()
const express = require('express');
const router = express.Router();
const User = require('./ori.js')
// const userSchema = require('./user.js')
const logger = require('morgan')
const path = require('path')
const history = require('connect-history-api-fallback')
const { createProxyMiddleware } = require('http-proxy-middleware')
const app = express()
const crypto = require('crypto'); //Node.js 에서 제공하는 암호화 모듈
//const properties = require('../properties/key.js');
// mapping 
// Login
// router.get('/', function (req, res, next) {
// });

app.use(history())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const _path = path.join(__dirname, './test/dist')
app.use('/', express.static(_path))
app.use(logger('tiny'))

// Sign Up
// Post로만 받는다
app.post('/SignUp', (req, res) => {
    // const crypto_key = req.body.user_pwd;

    // crypto.randomBytes(64, (err, buf) => {
    //암호화
    // crypto.pbkdf2(crypto_key, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
    //     const hash = key.toString('base64');
    //     console.log(hash)

    //복호화(hash === hash2가 true) ===>> 로그인할때 비밀번호 확인
    // crypto.pbkdf2(crypto_key, buf.toString('base64'), 100000, 64, 'sha512', (err2, key2) => {
    //     const hash2 = key2.toString('base64')
    //     console.log(hash === hash2)
    // });

    const user_save = async () => {
        const _data = {
            "user_id": req.body.user_id,
            "user_pwd": req.body.user_pwd,  //hash
            "user_nickname": req.body.user_nickname,
            "user_email": req.body.user_email,

            "birth": "",
            "gender": "",
            "hobby": "",
        }
        const new_user = new User(_data);
        const t = await new_user.save();
        console.log(t)
        res.send('회원가입성공')
    }
    user_save()
    // });
    // });
});

app.get('/SignIn/SignUp/idc/:user_id', (req, res) => {
    console.log(req.params)
    const user_id = req.params.user_id
    console.log(user_id)
    const id_find = async () => {
        const t = await User.find({ user_id: { $eq: user_id } }, { _id: 0, __v: 0 })
            .lean()
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
        const t = await User.find({ user_nickname }, { _id: 0, __v: 0 })
            .lean()
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
        const t = await User.find({ user_email }, { _id: 0, __v: 0 })
            .lean()
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
app.post('/SignIn', (req, res) => {
    const user_id = req.body.user_id
    const user_pwd = req.body.user_pwd
    const id_find = async () => {
        const t = await User.find({ user_id }, { _id: 0, __v: 0 }).lean()
        return t
    }
    id_find().then(v => {
        console.log(v)
        if (v[0] == undefined) {
            res.send('wrong_id')
        }
        else {
            if (user_pwd === v[0].user_pwd) {
                res.send('login_success')
            }
            else {
                res.send('wrong_pwd')
            }
        }
    })
})


app.listen(3000, () => {
    console.log('3000 server start')
})