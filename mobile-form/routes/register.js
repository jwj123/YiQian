const log = require('../config/log').logger('routers.register');
const User = require('../db/user');

module.exports = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) return res.end('请求参数有误', 400);
  User.findOne({ username })
  .then(function(doc) {
    if (doc) throw new Error('hasuser');
    else return User.insertOne({
      username, 
      password,
      signup_time: Date.now(), 
    })
  })
  .then(() => {
    next(); // 交给login处理
  })
  .catch((err) => {
    if (err.message === 'hasuser') {
      res.status(400).send('该账户已被注册').end();
    }
    log.info(err);
    res.status(500)
    .send('服务器数据库错误')
    .end();
  });
};

