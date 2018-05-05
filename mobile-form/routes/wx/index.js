
const express = require('express');
const router = express.Router();
const log = require('../../config/log').logger('routers.wx');
const axios  = require('axios');
const config = require('./config.json');
const Utils = require('./utils');
const Token = require('./token');
const User = require('../../db/user');
const getToken = require('../utils/jwt').getToken;

const redirectUrl = Utils.getAuthUrl(config.appId, config.redirectUrl);

function getAccessToken (code) {
  const requestUrl = Utils.getAccessTokenUrl(config.appId, config.secret, code);
  return axios.get(requestUrl);
}


function getUserInfo (accessToken, openId) {
  const userInfoUrl = Utils.getUserInfoUrl(accessToken, openId);
  return axios.get(userInfoUrl);
}

// function refreshToken () {
//   return Token.findOne().then(token => {
//     token.refreshToken
//   });
//   const refreshUrl = Utils.getRefreshTokenUrl(config.appId, );
// }

router.get('/', (req, res) => {
  const code = req.query.code;
  if (!code) return res.redirect(redirectUrl);
  getAccessToken(code)
  .then((response) => {
    const message = response.data;
    if (message.access_token) {
      Token.accessToken = message.access_token;
      Token.expireTime = Date.now() + ((message.expires_in)-200*1000); // 以毫秒计时
      Token.refreshToken = message.refresh_token;
      return getUserInfo(Token.accessToken, message.openid);
    } else {
      throw new Error(JSON.stringify(message));
    }
  })
  .then((response) => {
    const message = response.data;
    if (message.openid) {
      return User.findOne({ openid: message.openid }, {})
      .then((doc) => {
          log.warn(JSON.stringify(doc));
          if (doc) {
            res.redirect('/index.html');
          } else {
            message.avatar = message.headimgurl;
            if (message.sex === 0) {
              message.sex = 'female';
            } else if (message.sex === 1) {
              message.sex = 'male';
            }
            return User.insertOne(message)
            .then(() => {
              res.redirect(`/index.html?openid=${message.openid}`);
            });
          }
      });
    } else {
      throw new Error(JSON.stringify(message));
    }
  })
  .catch(err => {
    log.error(JSON.stringify(err));
    res.redirect(redirectUrl);
  })
  
});

router.get('/login/:id', (req, res) => {
  const openid = req.params.id;
  if (openid) {
    User.findOne({ openid })
    .then((doc) => {
      if (!doc) throw new Error('nouser');
      const [token, exp] = getToken(doc._id);
      res.json({
        message: 'ok',
        data: {
          token,
          exp,
        },
      });
    })
    .catch((err) => {
      if (err.message === 'nouser') {
        res.status(400).send('无此微信帐号').end();
      }
      else {
        log.info(err);
        res.status(500)
        .send('服务器数据库错误')
        .end();
      }
    });
  } else {
    res.status(400)
    .send('无此微信帐号')
    .end();
  }
});

module.exports = router;