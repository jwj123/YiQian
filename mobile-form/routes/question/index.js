const express = require('express');
const router = express.Router();
const log = require('../../config/log').logger('routers.question');
const db = require('../../db').db;
const Question = require('../../db/question');


// 创建一个问题
router.post('/', (req, res) => {
  const question = req.body.data;
  Question.insertOne(question)
  .then((doc) => {
    res.json({ message: 'ok', data: { id: doc.insertedId } });
  })
  .catch((err) => {
    log.error(err);
    res.status(500).send('数据库服务器错误');
  });
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body.data;
  delete data._id;
  delete data.form_id;
  Question.updateOne({ _id: id }, data)
  .then(() => {
    res.json({ message: 'ok' });
  })
  .catch((err) => {
    log.error(err);
    res.status(500).send('数据库服务器错误');
  });
});

/**
 * 移动表单项的接口
 */
router.post('/:targetId/:forcedId', (req, res) => {
  const targetId = req.params.targetId;
  const forcedId = req.params.forcedId;
  const targetIndex = req.body.targetIndex;
  const forceIndex = req.body.forceIndex;
  Question.updateOne({ _id: targetId }, { index: targetIndex })
  .then(() => Question.updateOne({ _id: forcedId }, { index: forceIndex }))
  .then(() => { res.json({ message: 'ok' }); })
  .catch((err) => {
    log.error(err);
    res.status(500).send('数据库服务器错误');
  });
});


/**
 * 删除表单项接口
 */
router.delete('/:id', (req, res) => {
  const deleteId = req.params.id;
  Question.deleteOne({ _id: deleteId })
  .then(() => {
    res.json({ message: 'ok' });
  })
  .catch((err) => {
    log.error(err);
    res.status(500).send('数据库服务器错误');
  });
});


module.exports = router;