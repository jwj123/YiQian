const log = require('../../config/log').logger('routers.answer');
const express = require('express');
const Answer = require('../../db/answer');

const route = express.Router();

route.post('/', (req, res) => {
  const data = req.body;
  data.ip = req.ip;
  Answer.insertOne(data)
  .then((doc) => {
    res.json({ message: 'ok', data: doc });
  })
  .catch((err) => {
    res.status(500).send('服务器数据错误');
  });
});

module.exports = route;