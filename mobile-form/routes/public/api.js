const Form = require('../../db/form');
const Status = require('../../common/formStatus');
const Question = require('../../db/question');
/**
 * 根据FormId获取表单数据,需要进行判断是否发布
 */
module.exports = function(req, res) {
  const id = req.params.id;
  Form.findOne({ _id: id })
  .then((doc) => {
    if (doc) {
      if (Status.canVisit(doc.status)) {
        // 向数据库查询表单数据
        Question.findListByFormId(id)
        .then((list) => {
          doc.items = list;
          res.json({
            message: 'ok',
            data: doc,
          });
        })
        .catch((err) => {
          res.status(500).send('服务器数据库错误');
        });
      } else {
        res.status(400).send('还没有发布').end();
      }
    } else {
      res.status(400).send('表单不存在').end();
    }
  }).catch((err) => {
    res.status(500).send('服务器数据库错误').end();
  });
};