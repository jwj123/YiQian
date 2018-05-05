const db = require('./index').db;
const ObjectID = require('mongodb').ObjectID;

const col = 'forms';

function Form() {}

Form.prototype.findOne = (params) => {
  if (params._id) params._id = ObjectID(params._id.toString());
  return db.then(base => base.collection(col)
    .findOne(params));
};
Form.collection = func => db.then(base => func(base.collection(col)));


Form.prototype.updateOne = (id, params) =>
  Form.collection(form =>
  form.updateOne({ _id: ObjectID(id.toString()) }, { $set: params }));

Form.prototype.deleteOne = (id) => {
  const ID = ObjectID(id.toString());
  return db.then(base => base
  .collection(col)
  .deleteOne({ _id: ID }));
};

Form.prototype.findListByUserId = (userId, start, pageSize) =>
  db.then(base => base.collection(col)
  .find({ user_id: userId.toString() }, { intro: 0, items: 0 })
  .skip(start)
  .limit(pageSize)
  .toArray());

module.exports = new Form();
