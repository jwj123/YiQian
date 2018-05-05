
const User = require('../db/user');
const col = 'users';
const log = require('../config/log').logger('routers.login');
const getToken = require('./utils/jwt').getToken;

module.exports = function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      return res.end('请求参数有误!' ,400);
    }
    User.login(username, password)
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
        res.status(400).send('帐号或密码错误').end();
      }
      else {
        log.info(err);
        res.status(500)
        .send('服务器数据库错误')
        .end();
      }
    });
};
