var express = require('express');
var router = express.Router();
var log = require('../../config/log').logger('routers.form');
var db = require('../../db').db;
var ObjectID = require('mongodb').ObjectID;
var status = require('../../common/formStatus');
var col = 'forms';
const Form = require('../../db/form');
const Question = require('../../db/question');

/**
 * 创建问卷接口
 */
router.post('/create', function create(req, res) {
  const data = req.body;
  data.items = [];
  data.status = status.NOTPUBLIC;
  data.user_id = req.user._id.toString();
  data.create_time = Date.now(); // 获取时间戳
  // 向数据库查询数据
  db.then(function(base){
    return base.collection(col)
    .insertOne(data, { w: 1 })
    .then(function(data) {
      // 查询成功, 进行响应
      res.json({ message: 'ok', data: { id: data.insertedId } });
    });
  })
  .catch(function(err) {
    // 查询失败,记录日志,响应500
    log.error(err);
    res.status(500);
    res.send('服务器数据库出错!');
  });
});

/**
 * 删除表单接口
 */
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Form.deleteOne(id)
  .then((doc) => {
    res.json({ message: 'ok' });
  })
  .catch((errr) => {
    log.error(err);
    res.status(500).send('服务器数据库出错');
  });
});


/**
 * 获取表单数据接口
 */
router.get('/get/:id', function get(req, res) {
  const id = req.params.id;
  // 向数据库查询表单数据
  db.then(function(base) {
    if (!id) throw new TypeError('params');
    return base.collection(col)
    .findOne({ _id: ObjectID(id) })
    .then(function(doc) {
      Question.findListByFormId(id)
      .then((list) => {
        doc.items = list;
        res.json({ message: 'ok', data: doc });
      });
    });
  })
  .catch(function(err) {
    // 处理参数错误和数据库查询失败
    if (err.message === 'params' ) {
      res.status(400);
      res.send('请求参数有误!');
    } else {
      log.error(err);
      res.status(500);
      res.send('服务器数据库出错!');
    }
  });;
});


/**
 * 保存表单数据
 */
router.post('/save/:id', function save(req, res) {
  const id = req.params.id;
  const data = req.body;
  delete data.items;
  // 将表单保存到数据库当中
  db.then(function(base) {
    if (!id) throw new TypeError('params');
    return base.collection(col)
    .updateOne({ _id: ObjectID(id)}, { $set: data })
    .then(function(doc) {
      res.json({ message: 'ok', data: doc });
    });
  })
  .catch(function(err) {
    if (err.message === 'params') {
      res.status(400);
      res.send('请求参数有误');
    } else {
      log.error(err);
      res.status(500).send('服务器数据库出错');
    }
  });
});

/**
 * 发布表单接口
 */
router.post('/public/:id', function public(req, res) {
  const id = req.params.id;
  db.then((base) => {
    return base.collection(col)
    .updateOne({ _id: ObjectID(id) }, { $set: { status: status.COLLECTING } });
  })
  .then((doc) => {
    res.json({ 
      message: 'ok',
    });
  })
  .catch((err) => {
    if (err.message === 'params') {
      res.status(400);
      res.send('请求参数有误');
    } else {
      log.error(err);
      res.status(500).send('服务器数据库出错');
    }
  });
});

/**
 * 停止表单
 */
router.post('/stop/:id', (req, res) => {
  const id = req.params.id;
  Form.updateOne(id, { status: status.END })
  .then(() => res.json({
    message: 'ok',
  }))
  .catch((err) => {
    res.status(500).send('服务器数据库出错');
  });
});

module.exports = router;