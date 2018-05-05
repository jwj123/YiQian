const db = require('./index').db;
const ObjectID = require('mongodb').ObjectID;

const Question = function Question() {};


const col = 'questions';

Question.collection = func => db.then(base => func(base.collection(col)));

Question.prototype.insertOne = params =>
  Question.collection(dao => dao.insertOne(params, { w: 1 }));

Question.prototype.updateOne = (query, params) => {
  if (query._id) query._id = ObjectID(query._id);
  return Question.collection(dao =>
  dao.updateOne(query, { $set: params }));
};


Question.prototype.deleteOne = (query) => {
  if (query._id) query._id = ObjectID(query._id.toString());
  return Question.collection(dao => dao.deleteOne(query));
};

Question.prototype.findList = (query) => {
  if (query._id) query._id = ObjectID(query._id.toString());
  return Question.collection(dao => dao.find(query).sort({ index: 1 }).toArray());
};

Question.prototype.findListByFormId = formId =>
  Question.collection(dao => dao.find({ form_id: formId.toString() }).sort({ index: 1 }).toArray());

module.exports = new Question();
