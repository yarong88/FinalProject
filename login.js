const express = require('express');
const router = express.Router();
const User = require('../models/user');
const crypto = require('crypto'); //Node.js 에서 제공하는 암호화 모듈
//const properties = require('../properties/key.js');
// mapping 
// Login
router.get('/', function (req, res, next) {
});

// Sign Up
// Post로만 받는다
router.post('/SignUp', function (req, res, next) {
    const user = new User();
    // setting values
    user.id = req.body.user.id;
    user.password = req.body.user.password;
    user.nickname = req.body.user.nickname;
    user.email = req.body.user.email;

    // encryption 
    let cipher = crypto.createCipher('aes192', 'key');
    cipher.update(user.password, 'utf8', 'base64');
    let cipheredOutput = cipher.final('base64');
    user.password = cipheredOutput;
    /*  
      //decryption
      let decipher = crypto.createDecipher('aes192', 'key');
      decipher.update(cipheredOutput, 'base64', 'utf8');
      let decipheredOutput = decipher.final('utf8');
    */
    user.save(function (err) {
        if (err) {
            console.error(err);
            res.json({ result: 0 });
            return;
        }
        res.json({ result: 1 });
    });
});

module.exports = router;