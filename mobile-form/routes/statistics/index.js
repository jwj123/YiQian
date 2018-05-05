const express = require('express');
const log = require('../../config/log').logger('routers.statistics');
const Question = require('../../db/question');
const Answer = require('../../db/answer');

const router = express.Router();

function whichType(type) {
  if (type === 'select-multi') {
    return 'chart';
  } else {
    return 'pie';
  }
}


router.get('/data/:formId', (req, res) => {
  const formId = req.params.formId;
  const getQuestionList = Question.findList({ form_id: formId});
  const getAnswer = Answer.findListByFormId(formId);
  Promise.all([getQuestionList, getAnswer])
  .then(([qlist, alist]) => {
    res.json({
      message: 'ok',
      data: {
        qlist,
        alist
      },
    });
  })
  .catch((err) => {
    log.error(err);
    res.status(500).send('服务器数据库错误');
  });
});


/**
 * 获取报表接口
 */
router.get('/:formId', (req, res) => {
  const formId = req.params.formId;
  const result = [];
  // 查询数据库中所有这个表单中的表单项
  Question.findList({ form_id: formId, $or: [
    {type: 'select-multi'},
    { type: 'select-one' }]})
  .then((docs) => {
    const tasks = docs.map((doc) => {
      let itemTasks = [];
      if (doc.items) {
        itemTasks = doc.items.map((option) => {
          // 查询单选题或者多选题的所有选项的回答命中
          return Answer
          .countByLabel(option.label, doc._id.toString())
          .then((arr) => {
            if (arr[0]) {
              const count = arr[0].count;
              return [count, option.label];
            } else {
              return [0, option.label];
            }
          });
        });
      }
      return Promise.all(itemTasks).then((countResult) => {
        const item = {};
        item.data = [];
        item.labels = [];
        countResult.forEach((c) => {
          item.data.push(c[0]);
          item.labels.push(c[1]);
        });
        item.type = whichType(doc.type);
        item.title = `Q${parseInt(doc.index)+1}.${doc.label}`;
        return item;
      });
    });

    return Promise.all(tasks).then((items) => {
      return items;
    });
  })
  .then((result)=> {
    res.json({ message: 'ok', data: result });
  })
  .catch((err) => {
    log.error(err);
    res.status(500).send('服务器数据库错误');
  });
});

module.exports = router;