const Answer = function Answer() {};

const db = require('./index').db;

const col = 'answer';

Answer.collection = func => db.then(base => func(base.collection(col)));

Answer.prototype.insertOne = params =>
  Answer.collection(dao => dao.insertOne(params));


Answer.prototype.findListByFormId = formid =>
  Answer.collection(dao =>
    dao.find({ form_id: formid.toString() }).toArray());

Answer.prototype.countByLabel = (label, questionID) =>
  Answer.collection(dao => new Promise((resolve, reject) =>
    dao.aggregate([
      {
        $match: { 'content.id': questionID, 'content.value': { $in: [label] } },
      },
      {
        $group: { _id: 'form_id', count: { $sum: 1 } },
      }],
    (err, doc) => {
      if (err) reject(err);
      else resolve(doc);
    })));

module.exports = new Answer();
