const express = require('express');
const router = express.Router();
const log = require('../../config/log').logger('routers.user');
const Form = require('../../db/form');
const User = require('../../db/user');


// 获取用户的问卷
router.post('/form', function(req, res, next) {

  const user = req.user;
  if (!user) res.status(400).send('未授权').end();
  const pageSize = req.body.pageSize;
  const start = req.body.start;

  Form.findListByUserId(user._id, start, pageSize)
  .then((docs) => {
    res.json({ message: 'ok', data: docs });
  })
  .catch((err) => {
    log.error(err);
    res.status(500).send('服务器数据库错误');
  });
});

// 获取用户信息
router.get('/center', function(req, res, next) {
  const user = req.user;
  res.json({
    message: 'ok', 
    data: {
      avatar: user.avatar,
      nickname: user.nickname,
      birthday: user.birthday,
      sex: user.sex,
      qualification: user.qualification,
      work: user.work
    }
  });
});

router.get('/avatar', function(req, res) {
  const user = req.user;
  res.json({ message: 'ok', data: user.avatar });
});

router.post('/center/:prop', function(req, res){
  const user = req.user;
  const prop = req.params.prop;
  const data = req.body[prop];
  if (!data
  && prop !=='nickname'
  && prop !== 'birthday'
  && prop !== 'sex' 
  && prop !== 'qualification' 
  && prop!== 'work') res.status(403).send('请求不允许').end();
  User.updateOne(user._id, { [prop]: data })
  .then(() => {
    res.json({ message: 'ok' });
  })
  .catch((err) => {
    log.error(err);
    res.status(500);
    res.send('服务器数据库错误');
  });
});


module.exports = router;