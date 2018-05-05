const ObjectID = require('mongodb').ObjectID;
const db = require('./index').db;

const Admin = function Admin() {};


const col = 'admin';

Admin.collection = func => db.then(base => func(base.collection(col)));

Admin.prototype.insertOne = (param) => {
  if (param._id) delete param._id;
  return Admin.collection(dao => dao.insertOne(param));
};

Admin.prototype.deleteOne = (query) => {
  if (query._id) query._id = ObjectID(query._id.toString());
  return Admin.collection(dao => dao.deleteOne(query));
};


Admin.prototype.updateOne = (query, params) => {
  if (query._id) delete query._id;
  return Admin.collection(dao => dao.updateOne(query, { $set: params }));
};

Admin.prototype.findList = (query) => {
  if (query._id) query._id = ObjectID(query._id.toString());
  return Admin.collection(dao => dao.find(query).toArray());
};

Admin.prototype.findListByPage = (query, start, pageSize) => {
  if (query._id) query._id = ObjectID(query._id.toString());
  return Admin.collection(dao =>
  dao.find(query)
  .skip(parseInt(start, 10))
  .limit(parseInt(pageSize, 10))
  .toArray());
};



Admin.prototype.count = function count(query) {
  query = query || {};
  if (query._id) query._id = ObjectID(query._id);
  return Admin.collection(dao => dao.find(query).count());
};

Admin.prototype.findOne = (query) => {
  if (query._id) query._id = ObjectID(query._id.toString());
  return Admin.collection(dao => dao.findOne(query));
};

module.exports = new Admin();
