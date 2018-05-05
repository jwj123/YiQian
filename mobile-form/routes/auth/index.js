const log = require('../../config/log').logger('routers.auth');
const jwt = require('jwt-simple');
const User = require('../../db/user');
const key = require('../../config/auth/secret.json').key;

// 验证token
module.exports = function(req, res, next) {
  const token = req.headers['x-token'] || (req.query && req.query.token);
  if (token) {
    try {
      const decoded = jwt.decode(token, key);
      if (decoded.exp <= Date.now()) {
        res.status(401)
        .send('token has expired')
        .end(); // 403 服务器拒绝请求
      }
      User.findOne({ _id: decoded.iss }, { password: 0 })
      .then((doc) => {
        if (!doc) throw new Error('nouser');
        req.user = doc;
        next();
      })
      .catch((err) => {
        if (err.message === 'nouser') {
           res.status(401)
          .send('no such user')
          .end();
        } else {
          log.error(err);
          res.status(500)
          .send('服务器数据库出错')
          .end();
        }
      });
    } catch (error) {
      log.error(error);
      res.status(500)
      .send('token decode error')
      .end();
    }
  } else {
    res.status(401) // 401授权失败
    .send('no token find')
    .end();
  }
};