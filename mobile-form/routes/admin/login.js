
const log = require('../../config/log').logger('routers.adming.login');
const express = require('express');
const route = express.Router();
const Admin = require('../../db/admin');

route.get('/', (req, res) => {
  res.render('admin/login');
});

route.post('/indentify', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.status(400).send('请求参数有误!').end();
  }
  Admin.findOne({ username, password })
  .then((doc) => {
    if (doc) {
      req.session.admin = doc;
      res.json({ message: 'ok' });
    } else {
      res.json({ message: '没有该管理员' });
    }
  })
  .then((err) => {
    log.error(err);
    res.status(500).send('服务器数据库错误');
  });
});


module.exports = route;